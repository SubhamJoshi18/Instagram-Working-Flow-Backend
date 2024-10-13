from flask import jsonify
from flask_smorest import Blueprint
from flask.views import  MethodView
from controller.feeds.index import getAllFeeds

blp = Blueprint('feed',__name__,description='Feed Routers')

@blp.route('/feeds')
class Feeds(MethodView):

    def get(self):
        result = getAllFeeds()
        return result,201