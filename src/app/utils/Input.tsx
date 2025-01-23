type comps ={
    classname? : string,
    id?:string,
    value?:string,
    required?:boolean,
    onChange?:(e:any)=>void,
    placeholder:string,
    name?:string,
    type?:string;
    max?:string;
    min?:string;
    pattern?:string;
    onKeyDown?:(e:any)=>void,
        
    
}
const Input:React.FC<comps> = ({id,value,required,onChange,placeholder,name, type,classname, max,min, pattern, onKeyDown})=>{
    

    return(
        <input id={id} value={value} required={required} onChange={onChange} placeholder={placeholder} name={name} type={type} max={max} min={min} pattern={pattern} onKeyDown={onKeyDown} className=" flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 block w-full" 
          ></input>
    )

}
export default Input;