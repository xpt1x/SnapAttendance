from flask import Flask, render_template, request, jsonify, redirect, send_from_directory
from flask_cors import CORS
from uims_api import SessionUIMS
from uims_api.exceptions import IncorrectCredentialsError, UIMSInternalError
import logging

# For production using build
app = Flask(__name__, template_folder='frontend/build',
            static_folder='frontend/build/static')
CORS(app)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/<path:filename>')
def base_static(filename):
    return send_from_directory(app.root_path + '/frontend/build/', filename)

@app.route('/api', methods=['POST'])
def get_data():

    if not request.form.get('uid'):
        return jsonify({'error': 'UID not provided'})
    if not request.form.get('password'):
        return jsonify({'error': 'Password not provided'})

    try:
        my_acc = SessionUIMS(request.form.get('uid'), request.form.get('password'))
    except Exception as e:
        if e.__class__ == IncorrectCredentialsError:
            return jsonify({'error': 'Invalid credentials'})
    try:
        subjects = my_acc.attendance
    except Exception as e:
        if e.__class__ == UIMSInternalError:
            return jsonify({'error': 'UIMS Internal Failure'})
    else:
        return jsonify(subjects)

@app.errorhandler(500)
def server_error(e):
    logging.exception('An error occurred during a request.')
    return """
    An internal error occurred: <pre>{}</pre>
    See logs for full stacktrace.
    """.format(e), 500

if __name__ == '__main__':
    # This is used when running locally. Gunicorn is used to run the
    # application on Google App Engine. See entrypoint in app.yaml.
    app.run(host='127.0.0.1', port=8080, debug=True)
# [END gae_flex_python_static_files]