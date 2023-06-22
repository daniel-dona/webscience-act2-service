import axios from "axios";

import React, { useState } from "react";

import { Container, Panel, Input, IconButton, ButtonToolbar, Tag, TagGroup, Table, Dropdown} from "rsuite";

const { Column, HeaderCell, Cell } = Table;


import PlayIcon from '@rsuite/icons/legacy/Play';


function Interface() {
	
	const [haveResults, setHaveResults] = React.useState(false);
	
	const [isLoading, setIsLoading] = React.useState(false);
	
	const [terms, setTerms] = React.useState("");
	
	const [taxonomy, setTaxonomy] = React.useState([]);
	
	const [newTerms, setNewTerms] = React.useState([]);
	
	const examples = [
		"dog\nparrot\nrabbit\ndonkey",
		"butane\npropane\nciclohexane",
		"tulip\nrose\ndaisy",
		"tolperisone\nvicodin\noxycodone"
	]
		
		
	
	
	
	
	
	const request = async (endpoint, method, data) => {

		let result = null;
		
		let request = 
		
			{
				"method": method,
				"url": endpoint,
				data: data
			};
			

		
		result = (await axios(request))["data"];
			
		return result;
		
	};
	
	const onExample = (option) => {
		
		setTerms(examples[option]);
		
	}
	
	const onWrite = (text) => {
		
		setTerms(text);
		
	}
	
	const onRun = async () => {
		
		setHaveResults(false);
		
		setIsLoading(true);
		
		let data = {"terms": terms}
		
		let results = await request("/results", "POST", data);
		
		console.log(results);
		
		setIsLoading(false);
		
		setHaveResults(true);
		
		if (results !== undefined){
		
			setTaxonomy(results.found_taxonomy);
			
			setNewTerms(results.new_terms);
		}
		
	}

	return (
	
		<Container style={{"margin": "5em auto", "maxWidth": "1200px"}}>
		
			<h1> Simple Wikidata terminology expansion </h1>
		
			<h3> Web Sciente, MUIA, deliverable for lesson 2</h3>
		
			<Panel style={{"margin": "15px 0"}} bordered>
				<p>
					Terminology in the input field is processed to extract taxonomy information, which is then used to seek additional related vocabulary. 
					Results are highly dependent on the quality of Wikidata annotations for given terms. 
					Only exact term matches are used; no full-text search is implemented.
				</p>
				<p>
					Properties wdt:P31 and wdt:P279 are used to infer terminology connectivity, and more potential properties were identified (as wdt:P361 and wdt:P373),
					but the SPARQL query interface is not performant enough to resolve more complex queries without timing out.
				</p>
			</Panel>
		
			
		
			<Panel style={{"margin": "15px 0"}} header="Terminology input" bordered>
				<Input as="textarea" rows={15} placeholder="Write a list of terms, one per line... or try one of the examples!" onChange={onWrite} value={terms}/>
			</Panel>
			<ButtonToolbar style={{"margin": "15px 0"}}>
				<div style={{flexGrow:1}}></div>
				
				<Dropdown title="Examples">
					<Dropdown.Item onClick={() => { onExample(0) }}>Domestic mammals</Dropdown.Item>
					<Dropdown.Item onClick={() => { onExample(1) }}>Alkanes</Dropdown.Item>
					<Dropdown.Item onClick={() => { onExample(2) }}>Flowers</Dropdown.Item>
					<Dropdown.Item onClick={() => { onExample(3) }}>Drugs</Dropdown.Item>
				</Dropdown>
				
				<IconButton onClick={onRun} appearance="primary" color="green" icon={<PlayIcon />} placement={"right"} loading={isLoading}>
					Search for terms
				</IconButton>
			</ButtonToolbar>
			
			{ haveResults && 
			
				(<>
					<Panel style={{"margin": "15px 0"}} header="Taxonomy found" bordered>
						<Table
						  height={400}
						  data={taxonomy}
						>
						<Column width={400} align="center" fixed>
							<HeaderCell>Class label</HeaderCell>
							<Cell dataKey="classLabel" />
						</Column>

						  <Column width={400}>
							<HeaderCell>Class URI</HeaderCell>
							<Cell dataKey="class" />
						  </Column>
						  
						  <Column width={150}>
							<HeaderCell>Class population</HeaderCell>
							<Cell dataKey="classPopulation" />
						  </Column>

						  <Column width={150}>
							<HeaderCell>Match count</HeaderCell>
							<Cell dataKey="matches" />
						  </Column>
						</Table>
					</Panel>
					<Panel style={{"margin": "15px 0"}} header="Terminology results" bordered>
						<Table
						  height={400}
						  data={newTerms}
						>
						<Column width={400} align="center" fixed>
							<HeaderCell>Term label</HeaderCell>
							<Cell dataKey="termLabel" />
						</Column>

						  <Column width={400}>
							<HeaderCell>Term URI</HeaderCell>
							<Cell dataKey="term" />
						  </Column>
						</Table>
					</Panel>
				</>)
				
			}
			
		</Container>
		
	);
}


export default Interface;

