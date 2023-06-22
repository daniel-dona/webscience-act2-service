import os

import traceback
import logging
import uuid
import json

from flask import Flask, send_file, jsonify, Response, request
from flask_restful import Resource, Api, reqparse

from flask_cors import CORS

import TermSearch
import TaxonomySearch
import TermExpand

SPARQL_ENDPOINT = "https://query.wikidata.org/bigdata/namespace/wdq/sparql"

class GetResults(Resource):

	def post(self):
		
		result = {}
		
		parser = reqparse.RequestParser()
		parser.add_argument('terms')

		data = parser.parse_args()
		
		if data["terms"] is not None and data["terms"] != "":
		
			query_terms = [ t for t in data["terms"].split("\n") if len(t) > 2 ]
			
			print(query_terms)
				
			terms = TermSearch.TermSearch(sparql_endpoint=SPARQL_ENDPOINT).find_terms_in_kg(query_terms)

			taxonomy_classes = TaxonomySearch.TaxonomySearch(sparql_endpoint=SPARQL_ENDPOINT).find_taxonomy_in_kg(terms)
			
			new_terms = TermExpand.TermExpand(sparql_endpoint=SPARQL_ENDPOINT).find_new_terms_in_kg(taxonomy_classes)
			
			result["found_terms"] = terms
			
			result["found_taxonomy"] = taxonomy_classes
			
			for term in new_terms.copy():
				
				if term["termLabel"] in query_terms:
					
					new_terms.remove(term)
			
			
			result["new_terms"] = new_terms
			
		

		return jsonify(result)


app = Flask(__name__)
api = Api(app)
cors = CORS(app)

api.add_resource(GetResults, "/results")

app.run(debug=False, host='0.0.0.0', port=8081)

