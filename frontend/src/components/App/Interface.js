import axios from "axios";

import React, { useState } from "react";

import { Container, Panel, Input, IconButton, ButtonToolbar, Tag, TagGroup, Table} from "rsuite";

const { Column, HeaderCell, Cell } = Table;


import PlayIcon from '@rsuite/icons/legacy/Play';


function Interface() {
	
	const [haveResults, setHaveResults] = React.useState(false);
	
	const [isLoading, setIsLoading] = React.useState(false);
	
	const [terms, setTerms] = React.useState("");
	
	const [taxonomy, setTaxonomy] = React.useState([]);
	
	const [newTerms, setNewTerms] = React.useState([]);
	
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
	
	const onWrite = (text) => {
		
		setTerms(text);
		
	}
	
	const onRun = async () => {
		
		setHaveResults(false);
		
		setIsLoading(true);
		
		let data = {"terms": terms}
		
		let results = await request("http://localhost:8081/results", "POST", data);
		
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
					Terminology in the input field are processed to extract taxonomy information and that information is then used to seek for additional terminology that is related.
					Results are higly dependent on the quality of Wikidata annotations for given terms. Only exact terms matches are used, not full text search is implemented.
				</p>
			</Panel>
		
			
		
			<Panel style={{"margin": "15px 0"}} header="Terminology input" bordered>
				<Input as="textarea" rows={15} placeholder="Textarea" onChange={onWrite}/>
			</Panel>
			<ButtonToolbar style={{"margin": "15px 0"}}>
				<div style={{flexGrow:1}}></div>
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

