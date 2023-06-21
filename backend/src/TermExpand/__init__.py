import SPARQLWrapper

class TermExpand:


	def __init__(self, sparql_endpoint):
	
		self.sparql_endpoint = sparql_endpoint
		
		self.agent = "Web Science deliverable 2 (https://daniel.doña.es; daniel.dona@upm.es)"
	
		self.sparql = SPARQLWrapper.SPARQLWrapper(self.sparql_endpoint, agent = self.agent)
		self.sparql.setReturnFormat(SPARQLWrapper.JSON)
		self.sparql.setMethod(SPARQLWrapper.POST)
		
		
	def find_new_terms_in_kg(self, class_list):
		
		query_fragments = []
		
		props = ["P31", "P279"] #, "P361", "P373"]
		
		proplist = [f"(wdt:{p})" for p in props]
		
		classlist = [f"(<{c['class']}>)" for c in class_list]

		results = []
	
		query = '''
		
			PREFIX wd: <http://www.wikidata.org/entity/>
			PREFIX wdt: <http://www.wikidata.org/prop/direct/>
		
			SELECT ?item ?itemLabel

			WHERE {
			
				{
		  
				  SELECT ?item (count( ?item) as ?count) 
				  WHERE{
				  
					SELECT  ?item ?prop ?class
					WHERE{
					
					  VALUES (?prop) { '''+" ".join(proplist)+''' }
					  VALUES (?class) {  '''+" ".join(classlist)+''' }
					  ?item ?prop ?class.
					
					}
				  
				  }

				  GROUP BY (?item)
				  HAVING (?count > 2)
				  ORDER BY DESC (?count)
				  LIMIT 20
				
				}
		  
			SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
	  
		}

		'''

		self.sparql.setQuery(query)

		query_results = self.sparql.queryAndConvert()
		
		print(query_results)
		
		for query_result in query_results["results"]["bindings"]:
					
			results.append({
				"term": query_result["item"]["value"],
				"termLabel": query_result["itemLabel"]["value"]
				})
						
		return results
