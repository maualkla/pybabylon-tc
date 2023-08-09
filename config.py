import os

class Config:
    CONF_URL=os.environ.get('ENV_URL', 'http://127.0.0.1')
    CONF_PORT=os.environ.get('ENV_PORT', '3000')