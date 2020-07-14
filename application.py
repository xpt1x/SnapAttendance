from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
from uims_api import SessionUIMS

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
