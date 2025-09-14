import {} from "lucide-react"

export default function AppButton(props){
    return (
        <button>
            {/* vai depender do icone */}
            {props.text}        
        </button>
    )
}