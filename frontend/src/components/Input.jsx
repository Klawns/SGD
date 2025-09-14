export default function Input(props) {
    return(
        <>
        <label
        className=""
        >{props.label}</label>
        <input 
        className=""
        type={props.type} 
        value={props.value}
        placeholder={props.placeholder}
        onChange={(e) => props.setThing(e.target.value)}
        />
        </>
    );
}