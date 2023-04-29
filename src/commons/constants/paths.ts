const paths = {
    scan : {
        root: '/scan/menu',
        newComputer: '/scan/new-computer',
        editComputer: '/scan/edit-computer',
        newCourse: '/scan/new-course',
        newStudent: '/scan/new-student',
        endLoan: '/scan/end-loan',
    },
    computers: {
        root: '/computers',
        new: '/computers/new',
        detail: '/computers/:id'
    },
    loans: {
        root: '/loans',
        detail: '/loans/:id',
        newCollective: '/loans/new-collective',
        newIndividual: '/loans/new-individual',
        end: '/loans/end/:id',
    }
}

export default paths;