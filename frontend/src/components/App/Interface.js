import axios from "axios";

import React, { useState } from "react";

import { Container, Panel, Input, IconButton, ButtonToolbar, Tag, TagGroup} from "rsuite";

import PlayIcon from '@rsuite/icons/legacy/Play';


function Interface() {
	
	const [haveResults, setHaveResults] = React.useState(false);
	
	const [terms, setTerms] = React.useState("");
	
	const request = async (endpoint, method, data) => {

		let result = null;
		
		let request = 
		
			{
				"method": method,
				"url": endpoint,
				data: data
			};
			

		
		result = await axios(request)["data"];
			
		return result;
		
	};
	
	const onWrite = (text) => {
		
		setTerms(text);
		
	}
	
	const onRun = async () => {
		
		setHaveResults(true);
		
		let data = {"terms": terms}
		
		let results = await request("http://localhost:8081/results", "POST", data);
		
		console.log(results);
		
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
				<Input as="textarea" rows={15} placeholder="Textarea" />
			</Panel>
			<ButtonToolbar style={{"margin": "15px 0"}}>
				<div style={{flexGrow:1}}></div>
				<IconButton onClick={onRun} appearance="primary" color="green" icon={<PlayIcon />} placement={"right"}>
					Search for terms
				</IconButton>
			</ButtonToolbar>
			
			{ haveResults && 
			
				(<>
					<Panel style={{"margin": "15px 0"}} header="Taxonomy found" bordered>
						<TagGroup>
							<Tag>Animal</Tag>
						</TagGroup>
					</Panel>
					<Panel style={{"margin": "15px 0"}} header="Terminology results" bordered>
						<Input as="textarea" rows={15} disabled />
					</Panel>
				</>)
				
			}
			
		</Container>
		
	);
}


export default Interface;

