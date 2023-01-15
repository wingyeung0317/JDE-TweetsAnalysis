from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

### SQL link ###
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:password@localhost/brand'
db = SQLAlchemy(app)
CORS(app)

# class Event(db.Model):
#     id = db.Column(db.Integer, primary_key = True)
#     name = db.Column(db.String, nullable=False)

#     def __repr__(self):
#         return f"Event: {self.name}"

#     def __init__(self, description):
#         self.description = description

@app.route('/')
def hello():
    return 'Hello world!'

@app.route('/eBrands', methods=['POST'])
def lBrands():
    brand_list = request.get_json(force=True)
    print(brand_list)
    return str(brand_list)

if __name__ == '__main__':
    app.run()