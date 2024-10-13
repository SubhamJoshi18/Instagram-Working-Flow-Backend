import os
from dotenv import load_dotenv, find_dotenv
from flask import Flask,request
from flask_smorest import Api
from resources.feedResource import blp as FeedBlueprint
load_dotenv(find_dotenv())

server_port = os.getenv('SERVER_PORT')
app = Flask(__name__)

app.config['PROPAGATE_EXCEPTIONS'] = True
app.config['API_TITLE'] = 'Model Rest Api'
app.config['API_VERSION'] = 'v1'
app.config['OPENAPI_VERSION'] = '3.0.3'
app.config['OPENAPI_URL_PREFIX'] = '/'
app.config['OPENAPI_SWAGGER_UI_PATH'] = '/swagger-ui'
app.config['OPENAPI_SWAGGER_UI_URL'] = 'https://cdn.jsdelivr.net/npm/swagger-ui-dist/'


api = Api(app=app)

api.register_blueprint(FeedBlueprint)


if __name__ == "__main__":
    app.run(host='0.0.0.0',port=server_port,debug=True)
