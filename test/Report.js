process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Report = require('./../models/reportModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./../server');

// Assertion style
const should = chai.should();

chai.use(chaiHttp);


describe("Report", function() {
    /*
    * Test the /POST route
    */
    describe("/POST reports", () => {
        //Before each test we empty the database
        beforeEach((done) => {
            Report.deleteMany({}, (err) => {
                done();
            });
        });
        // Without cmdtyID
        it('it should not POST a report without cmdtyID', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });
        // Without marketID
        it('it should not POST a report without marketID', (done) => {
            let report = {
                userID: "user-1",
                cmdtyID: "cmdty-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });
        // Without userID
        it('it should not POST a report without userID', (done) => {
            let report = {
                marketID: "market-1",
                cmdtyID: "cmdty-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });
        // Without convFctr
        it('it should not POST a report without convFctr', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                cmdtyID: "cmdty-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                minPrice: 700,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });
        // Without minPrice
        it('it should not POST a report without minPrice', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                cmdtyID: "cmdty-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });
        // Without maxPrice
        it('it should not POST a report without maxPrice', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                cmdtyID: "cmdty-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {  
                    res.should.have.status('500');
                    res.body.should.be.a('object');
                    res.body.should.have.property('error');
                    done();
              });
        });

        // Without non essential fields
        it('it should POST a report without non essential fields', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                cmdtyID: "cmdty-1",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            }
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {
                    res.should.have.status('201');
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql("success");
                    res.body.should.have.property('reportID');
                    done();
              });
        });
        // With all fields
        it('it should POST a report without all fields', (done) => {
            let report = {
                userID: "user-1",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            };
          chai.request(server)
              .post('/reports')
              .send(report)
              .end((err, res) => {
                    res.should.have.status('201');
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql("success");
                    res.body.should.have.property('reportID');
                    done();
              });
        });
    })

    /*
    * Test the /GET?cmdtyID route
    */
    describe("/GET report", () => {

        //Before each test we empty the database
        beforeEach((done) => {
            Report.deleteMany({}, (err) => {
                done();
            });
        });

        // For unknown cmdtyID
        it('it should not get the reports for a an unknown cmdtyID', (done) => {
            chai.request(server).
            get('/reports?cmdtyID=cmty1').
            end((err, res) => {
                res.should.have.status('404');
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql("fail");
                res.body.should.have.property('message').eql('Record not found');
                done();
            });
        });
        // For known cmdtyID
        it('it should get the reports for a an known cmdtyID', (done) => {
            const report = new Report({
                userID: "user-1",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            });
            report.save((err,report) => {
                chai.request(server).
                get(`/reports?cmdtyID=${report.cmdtyID}`).
                send(report).
                end((err, res) => {
                res.should.have.status('200');
                res.body.should.be.a('object');
                res.body.should.have.property('report');
                res.body.report.should.be.a('array');
                res.body.report.length.should.be.eql(1);
                res.body.report[0].should.have.property('cmdtyID').eql(report.cmdtyID);
                res.body.report[0].should.have.property('marketID').eql(report.marketID);
                res.body.report[0].should.have.property('userID').to.have.members(report.userID);
                res.body.report[0].should.have.property('minPrice').eql(report.minPrice);
                res.body.report[0].should.have.property('maxPrice').eql(report.maxPrice);
                done();
            });
            })
        });


        describe("/GET after updating a report", () => {
            // For updating already existing cmdtyID-marketID
        it('it should update already existing cmdtyID-marketID', async () => {
            const report1 = new Report({
                userID: "user-1",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Pack",
                convFctr: 50,
                minPrice: 700,
                maxPrice: 900
            });

            const res1 = await chai.request(server)
              .post('/reports')
              .send(report1);

            const report2 = new Report({
                userID: "user-2",
                marketID: "market-1",
                marketName: "Vashi Navi Mumbai",
                marketType: "Mandi",
                cmdtyID: "cmdty-1",
                cmdtyName: "Potato",
                priceUnit: "Quintal",
                convFctr: 100,
                minPrice: 1600,
                maxPrice: 1800
            });

            const res2 = await chai.request(server)
            .post('/reports')
            .send(report2);

            chai.request(server).
            get('/reports?cmdtyID=cmdty-1').
            end((err, res) => {
                res.should.have.status('200');
                res.body.should.be.a('object');
                res.body.should.have.property('report');
                res.body.report.should.be.a('array');
                res.body.report.length.should.be.eql(1);
                res.body.report[0].should.have.property('cmdtyID').eql(report1.cmdtyID);
                res.body.report[0].should.have.property('marketID').eql(report1.marketID);
                res.body.report[0].should.have.property('priceUnits').eql('Kg');
                res.body.report[0].should.have.property('minPrice').eql(((report1.minPrice / report1.convFctr) + (report2.minPrice / report2.convFctr)) / 2 );
                res.body.report[0].should.have.property('maxPrice').eql(((report1.maxPrice / report1.convFctr) + (report2.maxPrice / report2.convFctr)) / 2 );
            });
        });
        })
        
    });
});