const cron = require("node-cron");
const { Op } = require("sequelize");
const db = require("../db.config");

const issueBook = db.issueBook;

const finePerDay = 10; // ₹10 per day

cron.schedule("* * * * *", async () => {
// cron.schedule("0 * * * *", async () => {
// cron.schedule("0 0 * * *", async () => {
    console.log("Running overdue cron job...");

    try {

        const today = new Date();

        /* -----------------------------
           1. Update Issued → Overdue
        ----------------------------- */

        await issueBook.update(
            { status: "Overdue" },
            {
                where: {
                    status: "Issued",
                    dueDate: {
                        [Op.lt]: today
                    }
                }
            }
        );

        /* -----------------------------
           2. Get all overdue records
        ----------------------------- */

        const overdueRecords = await issueBook.findAll({
            where: {
                status: "Overdue",
                finePaid: false
            }
        });

        /* -----------------------------
           3. Update fine amount
        ----------------------------- */

        for (const record of overdueRecords) {

            const dueDate = new Date(record.dueDate);

            const diffTime = today - dueDate;

            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            const fineAmount = diffDays * finePerDay;

            await issueBook.update(
                { fineAmount: fineAmount },
                { where: { id: record.id } }
            );
        }

        console.log("Overdue records updated");

    } catch (error) {
        console.error("Overdue cron error: ", error);
    }
});