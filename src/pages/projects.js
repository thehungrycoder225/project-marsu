const projects = [
    {
        id: 1,
        title: 'iUgnay Project',
        description: 'iUgnay Project, is a project that aims to provide internet access to underprivileged villages in Marinduque.',
        abstract: `Remote communities in Marinduque face significant barriers to digital connectivity due to their isolated locations and lack of infrastructure. These geographical challenges result in the lack, if not limited, access to reliable internet services, hindering educational opportunities, communication, economic development, and overall digital engagement. Without affordable and consistent internet access, residents are left disconnected from essential resources, unable to participate in online learning, access information, or leverage digital platforms for economic activities.

This program bridges the digital divide in remote Marinduque villages using satellite technology by combining Satellite Internet with a CICS-designed Wi-Fi system. It delivers affordable, high-speed connectivity despite geographical challenges. One sample village is in a Marinduque islet of Mongpong at the municipality of Santa Cruz, with over 1,000 residents now has more than 300 individuals accessing the internet, enhancing opportunities for education, communication, and economic growth. The initiative, also serving as an income-generating project, follows a structured approach including planning, network design, installation, testing, and monitoring.

Aligned with SDG 4, 9, and 11, the project promotes quality education, builds resilient infrastructure, and fosters sustainable community development. The income generated sustains technology costs, while local DepEd schools and barangays receive free internet access, supporting students in their online learning.`,
        overview: `The project was initiated to address the widespread lack of reliable internet connectivity in Marinduque’s remote locations, where geographical challenges hinder the reach of traditional mobile networks.

According to PSA Marinduque, 53.8% or 32,574 households reported that they have access to the Internet. This shows that there are a lot of Marinduqueños who are not connected to the internet, one of the reasons is the high internet cost and internet availability.`,
        image: 'iugnay.jpg',
        link: '/sgd/project/1',
        tags: [
            {
                name: 'Industry, Innovation, and Infrastructure',
                image: 'goals/E-WEB-Goal-09.png',
            },
        ],
        objectives: [
            'To deploy a technology-driven solution to provide high-speed internet access in various remote and isolated villages of Marinduque.',
            'To support the educational and economic needs of residents in these underserved villages.',
            'To create a scalable and sustainable model for expanding digital connectivity in rural communities.',
        ],
        subject: [
            {
                initiator: 'CICS',
                leader: 'CICS',
                members: ['CICS', 'CICS', 'CICS'],
            }
        ],
        environment: [
            {
                nature: 'Inhabitants of geographically isolated villages',
                industry: 'Residents who need internet connectivity service',
                government: 'Local Government Units ',
            },
        ],
        resources: [
            {
                human: ['CICS staff', 'Local residents'],
                financial: ['Php 100,000 Initial Cost', 'Php 40,000 yearly operational cost'],
                technical: ['Satellite Internet System', 'Wi-Fi vending machines', 'Fiber Optic Kits', 'Other networking devices'],
            },
        ],
        mechanism: [
            {
                planning: 'Conduct a needs assessment to identify target villages and their connectivity requirements.',
                design: 'Develop a network design that integrates satellite internet with a Wi-Fi system to provide high-speed connectivity.',
                installation: 'Deploy the technology solution in target villages, including the installation of satellite dishes and Wi-Fi vending machines.',
                testing: 'Conduct performance testing to ensure the reliability and speed of the internet connection.',
                monitoring: 'Monitor the network performance and user feedback to identify areas for improvement and expansion.',
            },
        ],
        content: 'Using satellite technology provides a sustainable solution to internet connectivity challenges in remote areas of Marinduque.',
        waypoints: [
            'No internet',
            'Limited internet',
            'Satellite technology',
            'Remote villages'
        ],
        launchd: 'January 2023',
        proponent: 'Marinduque State University - College of Information and Computing Sciences (CICS)',
        progress: 'Implemented in multiple villages with monitoring systems and community feedback mechanisms in place for evaluation and improvement.',
        problems: 'Intermittent satellite performance during adverse weather conditions and logistical difficulties related to accessing remote sites.',
        solution: 'Implementation of weather-resistant technologies and collaboration with villages for system support and maintenance',
        completion: 'Ongoing',
        impact: ['Provides students in remote locations with access to educational resources, enabling them to engage in online learning and research. [SDG4]', 'Expands the reach of MarSU educational programs and supports students and faculty in delivering remote instruction and conducting research', 'Positive feedback and support from local government units, which are open to further expansion efforts.'],
        output: 'Over 300 users served in initial deployment areas, with consistent internet speeds maintained and revenue generated through the Wi-Fi service ',
        costing: 'ROI of 173% within the first year, demonstrating the program’s economic viability and effectiveness.',
        future: 'Plans include extending coverage to additional villages of Marinduque, improving technological infrastructure for greater resilience, and exploring further collaborations with technology partners to enhance system performance.'
    },

];

export default projects;