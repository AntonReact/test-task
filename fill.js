import fillTable from './src/fillTable';

const getInputs = () => {
    const res = document.getElementsByClassName('MuiInput-input');
    const inputs = Object.keys(res).reduce((acc, key) => {
        const idx = +key;
        if (!Number.isNaN(idx)) return [...acc, res[idx]];
        else return acc;
    }, []);
    return inputs;
};

const fill = (data) => {
    const [name, email, firstPhone, secondaryPhone, desc] = getInputs();
    const inputs = { name, email, firstPhone, secondaryPhone, desc };
    Object.keys(data).forEach((key) => {
        const value = data[key];
        const input = inputs[key];
        if (input) {
            input.value = value;
            input.placeholder = value;
        }
    })
}

$(window).load(() => {
    $("button.MuiFab-root:contains('Fill')").click(() => {
        fill(data);
        fillTable(data.workers);
    })
})
