export default function Options({ options, onClick, isDisabled }) {

    return (
        <div className='options'>
            {options.map((option, index) => (
                <div key={index} className="form-check">
                    <button
                        onClick={() => onClick(option)}
                        disabled={isDisabled}
                    >{option}</button>
                </div>
            ))}
        </div>
    );
}
