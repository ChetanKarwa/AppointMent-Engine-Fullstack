const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = require("chai");
chai.use(chaiHttp);
const server = require("../index.js");

describe("Testing Backend. ", () => {

it("Server should details of a given date.", (done) => {
    
    chai.request(server)
        .get("/api/event?date=2021-01-19")
        .end((err, res) => {
            expect(res).to.have.status(200);
            console.log(res.body);
            
        });
});

});

// it("Server should book a slot.", (done) => {
//     let slot_detial = {
//         name: "name created by testing"
//     }

//     chai.request(server)
//         .post("/api/event/24")
//         .send(slot_detial)
//         .end((err, res) => {
//             expect(res).to.have.status(200);

//             chai.request(server)
//                 .get("/api/event/24")
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body[0]).to.deep.includes(slot_detial)
//                     done();
//                 });
//         });
// });

// it("Server should update the slot", (done) => {
//     let update_issue = {
//         slot_id: 20,
//     }
//     chai.request(server)
//         .patch("/api/event/17")
//         .send(update_issue)
//         .end((err, res) => {
//             expect(res).to.have.status(200);

//             chai.request(server)
//                 .get("/api/event/20")
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body[0]).to.deep.includes(update_issue)
//                     done();
//                 });
//         });
// });

// it("Server should delete a slot", (done) => {
//     let slot_delete_msg = {
//         "msg": "Slot Deleted"
//     }
//     chai.request(server)
//         .delete("/api/event/3")
//         .end((err, res) => {
//             expect(res).to.have.status(200);
//             expect(res.body).to.deep.includes(slot_delete_msg)
//             done();
//         });
// });
// });