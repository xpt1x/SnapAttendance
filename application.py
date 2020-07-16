from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS
from uims_api import SessionUIMS
import logging

# For production using build
app = Flask(__name__, template_folder='frontend/build',
            static_folder='frontend/build/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/api', methods=['POST'])
def get_data():

    if not request.form.get('uid'):
        return jsonify({'error': 'UID not provided'})
    if not request.form.get('password'):
        return jsonify({'error': 'Password not provided'})

    my_acc = SessionUIMS(request.form.get('uid'), request.form.get('password'))
    try:
        subjects = my_acc.attendance
    except:
        return jsonify({'error': 'Invalid credentials'})
    else:
        return jsonify(subjects)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

@app.before_request
def BeforeRequest():
    session.permanent = True
    if not request.is_secure and app.env != "DEVELOPMENT":
        url = request.url.replace("http://", "https://", 1)
        return redirect(url, code=301)

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_flex_python_static_files]