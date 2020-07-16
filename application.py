from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_cors import CORS
from uims_api import SessionUIMS

# For production using build
app = Flask(__name__, template_folder='frontend/build',
            static_folder='frontend/build/static')
CORS(app)

print(app.root_path)
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

    my_acc = SessionUIMS(request.form.get('uid'), request.form.get('password'))
    try:
        subjects = my_acc.attendance
    except:
        return jsonify({'error': 'Invalid credentials'})
    else:
        return jsonify(subjects)
