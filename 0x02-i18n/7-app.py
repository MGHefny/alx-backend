#!/usr/bin/env python3
""" app flask Task 3"""
from flask_babel import Babel
from flask import Flask, request, render_template, g
import pytz


class Config:
    """ flask conf """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """ get user by id """
    login_id = request.args.get('login_as', '')
    if login_id:
        return users.get(int(login_id), None)
    return None


@app.before_request
def before_request() -> None:
    """ resoult requist """
    user = get_user()
    g.user = user


@babel.localeselector
def get_locale() -> str:
    """ web site get locale """
    local_value = request.args.get('locale', '')
    if local_value in app.config["LANGUAGES"]:
        return local_value
    if g.user and g.user['locale'] in app.config["LANGUAGES"]:
        return g.user['locale']
    local_head = request.headers.get('locale', '')
    if local_head in app.config["LANGUAGES"]:
        return local_head
    return request.accept_languages.best_match(app.config["LANGUAGES"])


@babel.timezoneselector
def get_timezone():
    """time zone function"""
    timezone = request.args.get('timezone', '').strip()
    if not timezone and g.user:
        timezone = g.user['timezone']
    try:
        return pytz.timezone(timezone).zone
    except pytz.exceptions.UnknownTimeZoneError:
        return app.config['BABEL_DEFAULT_TIMEZONE']


@app.route('/')
def main_index() -> str:
    """ index page """
    return render_template('7-index.html')


if __name__ == '__main__':
    app.run(debug=True)
