import FillForm from './utils/FillForm';
import FillTable from './utils/FillTable';

$(window).load(() => {
    const { workers, ...form } = data;
    const { fill: fillTable } = new FillTable(workers);
    const { fill: fillForm } = new FillForm(form);
    $("button.MuiFab-root:contains('Fill')").click(() => {
        const isDialogOpen = !!$('.MuiDialog-container').length;
        if (isDialogOpen) return;
        fillForm();
        fillTable();
    })
})
