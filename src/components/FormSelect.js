const FormSelect = ({labelText, name , value, handleChange, list}) => {
    return(
        <div className="form-row">
            <label className="form-label" htmlFor={name}>{labelText || name}</label>
            <select name={name} value={value} onChange={handleChange} className="form-select">
                {list.map((item , index) => {
                    return(
                        <option key={index} value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    )
}
export default FormSelect;
