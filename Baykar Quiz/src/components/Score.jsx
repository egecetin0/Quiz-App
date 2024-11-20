export default function Score({ answers }) {
    return (
        <div className="d-inline-block">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Answer</th>
                    </tr>
                </thead>
                <tbody>
                    {answers.map((answer, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{answer}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
