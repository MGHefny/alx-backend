#!/usr/bin/env python3
""" app flask Task 3"""

from flask_babel import Babel
from flask import Flask, request, render_template


class Config:
    """ conf flask """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@app.route('/')
def main_index() -> str:
    """ index page """
    return render_template('3-index.html')


@babel.localeselector
def get_locale() -> str:
    """ web site get locale """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == "__main__":
    app.run(debug=True)
