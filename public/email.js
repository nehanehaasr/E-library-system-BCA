async function sendEmail(email, password, name) {
    let res = await fetch('/admin/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    });

    res = await res.json();

    if (res.error) {
        Qual.errordb("Error", res.message);
    } else {
        // Qual.successdb("Success", res.message);
    }
}