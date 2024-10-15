import os

from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from sqlalchemy import Column, Integer, String, ForeignKey, Text, UniqueConstraint
from sqlalchemy.orm import relationship

from app.config_reader import config
from app.db.base import Base


class Password(Base):
    __tablename__ = 'passwords'

    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey('users.id'), nullable=False)

    website_name = Column(String(100), nullable=False)
    username = Column(String(100), nullable=False)
    encrypted_password = Column(String(256), nullable=False)
    iv = Column(String(32), nullable=False)  # Initialization vector
    comment = Column(Text, nullable=True)

    user = relationship("User", back_populates='passwords')

    # This constraint does not work for some reason
    UniqueConstraint(
        'user_id', 'website_name', 'username',
        name='unique_user_website_username'
    )

    def __init__(self, user_id, website_name, username, password, comment):
        self.user_id = user_id
        self.website_name = website_name
        self.username = username
        self.iv = self.generate_iv()
        self.comment = comment
        self.encrypted_password = self.encrypt_password(password, config.passwords_encryption_key_bytes)

    @classmethod
    def generate_iv(cls):
        # Generate a random initialization vector (IV)
        return os.urandom(16).hex()

    def encrypt_password(self, password, key):
        # Password encryption using AES
        iv_bytes = bytes.fromhex(self.iv)
        cipher = Cipher(algorithms.AES(key), modes.CFB(iv_bytes), backend=default_backend())
        encryptor = cipher.encryptor()
        encrypted_password = encryptor.update(password.encode()) + encryptor.finalize()
        return encrypted_password.hex()

    def decrypt_password(self, key):
        # Password decryption using AES
        iv_bytes = bytes.fromhex(self.iv)
        cipher = Cipher(algorithms.AES(key), modes.CFB(iv_bytes), backend=default_backend())
        decryptor = cipher.decryptor()
        decrypted_password = decryptor.update(bytes.fromhex(self.encrypted_password)) + decryptor.finalize()
        return decrypted_password.decode()
