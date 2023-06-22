import SPARQLWrapper

class TaxonomySearch:


	def __init__(self, sparql_endpoint):
	
		self.sparql_endpoint = sparql_endpoint
		
		self.agent = "Web Science deliverable 2 (https://daniel.doña.es; daniel.dona@upm.es)"
	
		self.sparql = SPARQLWrapper.SPARQLWrapper(self.sparql_endpoint, agent = self.agent)
		self.sparql.setReturnFormat(SPARQLWrapper.JSON)
		self.sparql.setMethod(SPARQLWrapper.POST)
		
		
	def find_taxonomy_in_kg(self, term_list):
		
		query_fragments = []
		
		props = ["P31", "P279"] #, "P361", "P373"]
		
		for prop in props:
			
			for term in term_list:
				
				query_fragments.append(f" \u007b wd:{term['value'].replace('http://www.wikidata.org/entity/', '')} wdt:{prop} ?item \u007d")
		
		
		results = []
	
		query = '''
		
			PREFIX wd: <http://www.wikidata.org/entity/>
			PREFIX wdt: <http://www.wikidata.org/prop/direct/>
		
			SELECT ?item ?itemLabel ?count
			
			WHERE{
			  
				  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }

			  
				{
				
					SELECT ?item (count( ?item) as ?count) 
					WHERE {
					
					''' + "\nUNION\n".join(query_fragments) + '''
					
					}
						
					GROUP BY ?item
					HAVING (?count > 1)
				
				}
			}

			ORDER BY DESC(?count)
			
		'''

		self.sparql.setQuery(query)

		query_results = self.sparql.queryAndConvert()
		
		temporal_results = {}

		for query_result in query_results["results"]["bindings"]:
			
			print(query_result)
					
			temporal_results[query_result["item"]["value"]] = query_result
			
		classlist = [ f'(<{result["item"]["value"]}>)' for result in query_results["results"]["bindings"] ]
		
		print(classlist)
			
		query = '''
			
		SELECT ?class ?count 
		
		WHERE {
  
			VALUES (?class) { '''+" ".join(classlist)+''' }
		  
			{
		  
				SELECT ?class (COUNT(DISTINCT ?item) AS ?count) 
				
				WHERE{
			  
					?item wdt:P31 ?class.
				
			   }
			   
				GROUP BY ?class
				
				LIMIT 100
			
			
			}
		}'''
		
		self.sparql.setQuery(query)

		query_results = self.sparql.queryAndConvert()
		
		print(query_results)
		
		for query_result in query_results["results"]["bindings"]:
					
			results.append({
				"class": query_result["class"]["value"],
				"classLabel": temporal_results[query_result["class"]["value"]]["itemLabel"]["value"],
				"classPopulation": query_result["count"]["value"],
				"matches": temporal_results[query_result["class"]["value"]]["count"]["value"]
				})
						
		return results
