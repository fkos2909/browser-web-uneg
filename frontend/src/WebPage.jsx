import axios from 'axios'

const WebPage = (props) => {
    const onSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target[0];
        axios.post(
            'http://localhost:3001/newSearch',
            {line: value}
        )
        .then(r => props.onSearch({...r.data, line: value}))
        .catch(e => console.log('error:', e))
        
    };

    return (
        <div className="background">
        <form onSubmit={onSubmit} className="form-card">
            <div className="form-title">Welcome 👋</div>

            <div className="form-subtitle">What would you like to know?</div>

            <div className="auth">
            <div className="auth-label">type here..</div>
            <input className="auth-input" name="line" />
            <button className="auth-button" type="submit">
                Enter
            </button>
            </div>
        </form>
        </div>
    );
};

export default WebPage;