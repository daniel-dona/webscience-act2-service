import SPARQLWrapper

class TermSearch:


	def __init__(self, sparql_endpoint):
	
		self.sparql_endpoint = sparql_endpoint
		
		self.agent = "Web Science deliverable 2 (https://daniel.doña.es; daniel.dona@upm.es)"
	
		self.sparql = SPARQLWrapper.SPARQLWrapper("https://query.wikidata.org/bigdata/namespace/wdq/sparql", agent = self.agent)
		self.sparql.setReturnFormat(SPARQLWrapper.JSON)
		self.sparql.setMethod(SPARQLWrapper.POST)
		
		
	def find_terms_in_kg(self, term_list):
		
		results = []
	
		query = '''
		
			SELECT ?q ?term WHERE {
				
			  VALUES ?q { 'pen'@en }
							  
			  ?term (rdfs:label|skos:altLabel) ?q.
							  
			  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
							  
			}
			
		'''
		
		self.sparql.setQuery(query)

		query_results = self.sparql.queryAndConvert()

		for query_result in query_results["results"]["bindings"]:
					
			results.append(query_result)
			
			print(query_result)
