import { SingleEliminationBracket, Match, SVGViewer, createTheme  } from '@g-loot/react-tournament-brackets';

export const Matches = ({matches}) => (
    <section className="matches-container">
        <SingleEliminationBracket
            matches={matches}
            matchComponent={Match}
            theme={GoldenCup}
            options={{
                style: {
                roundHeader: {
                    backgroundColor: GoldenCup.roundHeader.backgroundColor,
                    fontColor: GoldenCup.roundHeader.fontColor,
                },
                connectorColor: GoldenCup.connectorColor,
                connectorColorHighlight: GoldenCup.connectorColorHighlight,
                },
            }}
            svgWrapper={({ children, ...props }) => (
            <SVGViewer 
                background={GoldenCup.svgBackground}
                SVGBackground={GoldenCup.svgBackground}
                width={850} 
                height={600} 
                {...props}
            >
                {children}
            </SVGViewer>
            )}
        />
    </section>
); 

// custom theme for the brackets component
const GoldenCup = createTheme({
    textColor: { main: 'var(--white)', highlighted: 'var(--white)', dark: 'var(--white)' },
    matchBackground: { wonColor: 'var(--neutral)', lostColor: 'var(--neutral-dark)' },
    score: {
      background: { wonColor: 'var(--neutral)', lostColor: 'var(--neutral-dark)' },
      text: { highlightedWonColor: 'var(--white)', highlightedLostColor: 'var(--white)' },
    },
    border: {
      color: 'var(--primary)',
      highlightedColor: 'var(--neutral)',
    },
    roundHeader: { 
        backgroundColor: 'var(--primary)', 
        fontColor: 'var(--neutral-dark)',
    },
    connectorColor: 'var(--primary)',
    connectorColorHighlight: 'var(--primary)',
    svgBackground: 'var(--neutral-dark)',
});



// export function Matches (props) {
//     let matchInfo = props.matchInfo;

//     return (
//         <section className="matches-container" style={props.pageStyles.matchupsContainer}>

//             {/* for each round in a circuit... */}
//             {matchInfo.map((round, index) => (

//                 // ...wrap that round in its own container
//                 <div data-round={++index}>

//                     {/* then for each match in a round, add individual match data */}
//                     {round.map((match) => (
//                         <div className="match-container" data-round={match.round}  data-match-number={match.match_number} key={match.match_id}>
//                             <p data-match-of={(match.team_1_name == null) ? match.match_1_number : "false"}>{(match.team_1_name != null) ? <Link to={ `/team/${match.team_1_id}` }>{match.team_1_name}</Link> : "placeholder"}</p>
//                             <p data-match-of={(match.team_2_name == null) ? match.match_2_number : "false"}>{(match.team_2_name != null) ? <Link to={ `/team/${match.team_2_id}` }>{match.team_2_name}</Link> : "placeholder"}</p>
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </section>
//     );
// }


