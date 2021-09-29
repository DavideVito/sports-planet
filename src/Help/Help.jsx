import React from "react";
import "./Help.css";
import Fab from "@material-ui/core/Fab";
import HomeIcon from "@material-ui/icons/Home";
import UpIcon from "@material-ui/icons/KeyboardArrowUp";

const AccordionItem = ({label, isCollapsed, handleClick, children}) => {
    return (
        <>
            <button className="accordion-button" onClick={handleClick}>
                {label}
            </button>
            <div
                className={`accordion-item ${isCollapsed ? 'collapsed' : 'expanded'}`}
                aria-expanded={isCollapsed}
            >
                {children}
            </div>
        </>
    );
};

const Accordion = ({defaultIndex, onItemClick, children}) => {
    const [bindIndex, setBindIndex] = React.useState(defaultIndex);

    const changeItem = itemIndex => {
        if (typeof onItemClick === 'function') onItemClick(itemIndex);
        if (itemIndex !== bindIndex) setBindIndex(itemIndex);
    };
    const items = children.filter(item => item.type.name === 'AccordionItem');

    return (
        <>
            {items.map(({props}) => (
                <AccordionItem
                    isCollapsed={bindIndex !== props.index}
                    label={props.label}
                    handleClick={() => changeItem(props.index)}
                    children={props.children}
                />
            ))}
        </>
    );
}

const Help = () => {
    const scrollTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    return (
        <>
            <br/><br/>
            <h1>Hai bisogno di una mano ?</h1>
            <h3>Cerca tra le domande più frequenti e magari troverai la risposta che cerchi !</h3>
            <h5>Oppure scrivi alla nostra email ufficiale e ti ricontatteremo al più presto <a
                href="#">assistenzasportsplanet@gmail.com</a></h5>
            <br/><br/>
            <div style={{marginBottom: "10px", left:"50%"}} className="fixed-bottom">
                <Fab href="/home"  className="back-home" color="primary" aria-label="edit"
                     variant="extended">
                    <HomeIcon style={{marginRight: "5px"}}/>
                    Torna alla home
                </Fab>
                <Fab style={{marginLeft: "5px"}} color="primary" aria-label="edit" onClick={scrollTop}>
                    <UpIcon/>
                </Fab>
            </div>
            <div id="accordion">
                <Accordion defaultIndex="1">
                    <AccordionItem label="Come faccio a postare un video ?" index="1">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    </AccordionItem>
                    <AccordionItem label="Come faccio a editare un video ?" index="2">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    </AccordionItem>
                    <AccordionItem label="Dove trovo la mia scheda tecnica ?" index="3">
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                        Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
}
export default Help;