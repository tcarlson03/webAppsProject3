import './App.css';
import React from 'react';
import App from './App';
import TeamMember from './TeamMember';
import Navigation from './Navigation';

function Team() {
    const teamMembers = [
        {
            name: 'Tyler Ton',
            image: 'thamer.png',
            description: 'I am a Computer Science enthusiast currently based in Melbourne, FL. Anticipating my graduation from the Florida Institute of Technology in May 2025 with a major in Computer Science and a Minor in Finance. My technical skill set encompasses languages like C, Java, and Python, along with hands-on experience in HTML, Docker, and Git. Excited for a future of possibilities!'
        },
        {
            name: 'Taylor Carlson',
            image: 'david.png',
            description: 'I am a Software Engineering undergraduate at Florida Institute of Technology, set to graduate in May 2025. With a GPA of 3.81, I consistently earn a place on the Deans list each year. My proficiency spans across various programming languages, notably JAVA, Python, and HTML. During my internship at United Parcel Service, I gained valuable hands-on experience in web development. I am passionate about expanding my skill set through ongoing projects and eager to contribute to innovative solutions in the field of software engineering.'
        },
        {
            name: 'David Tran',
            image: 'taylor.jpg',
            description: ' I am a Computer Scientist undergraduate at the Florida Institute of Technology, and am currently based in Melbourne, FL. I am expected to graduate in May of 2025 with a Bachelors in Computer Science, and I have experience working for companies such as Studio Koleman. In addition to my skills in C, Python, Java, HTML, CSS, Git, Docker, and more, I am also an Eagle Scout with skills related to outdoorsmanship and first aid.'
        },
        {
            name: 'Thamer Alharbi',
            image: 'tyler.jpg',
            description: 'My name is Thamer, an aspiring cybersecurity expert currently pursuing a Master’s degree in the field. I have been living in Melbourne since January 2022, where I am deeply engaged in studying advanced cybersecurity challenges. My areas of focus include malicious software analysis, digital forensics, and cyber risk assessment. With a keen interest in the latest cybersecurity trends and techniques, I am dedicated to developing the skills necessary to analyze and mitigate cyber threats, ensuring the protection of digital assets with precision and diligence.'
        },
        {
            name: 'Enrique Obregon',
            image: 'enrique.png',
            description: 'I am a computer science student currently studying at Florida Institute of Technology. I am graduating in may of 2025 and plan on working in the field of cybersecurity. I am well versed in many programming languages and know my way around cybersecurity tools. Currently I have mostly been working on computer graphics and webapps. I am excited to learn more and more with each year I spend in the field of computer science.'
        }
    ];

    return (
         <div className="App">
            <Navigation />
            <h2 className="Team">The Team</h2>
            <div className="team-container">
                {teamMembers.map(member => (
                    <TeamMember
                        key={member.name}
                        name={member.name}
                        image={member.image}
                        description={member.description}
                    />
                ))}
            </div>
         </div>
    );
}

export default Team;