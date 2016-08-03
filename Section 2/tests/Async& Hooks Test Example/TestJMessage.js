var Utils = require("../BackgroundNodeJS/JModel/utils");
var chai = require('chai');
var expect = chai.expect;
var jUnitTest = require('../BackgroundNodeJS/JUnitTest/index.js');
var messageModule = require('../BackgroundNodeJS/JMessage/api/message.js');

describe('Test Sending Individual Mail', function(){
   var tokenInfo = undefined;
   var request = undefined;
    
   before(function(done){
        var testjid = "55dbe259a87305c409c43cb6";
        var gameID = "COA_BETA";
    
        var callback = (err, data) => {
            tokenInfo = data;
            
            done();
        }
        
        //Fake token
        jUnitTest.FakeGenerateToken(testjid, gameID, callback, ["admin"]);    
   });
   
   it('Request not found', function(done){
       var args = {
           service: 'jmessage',
           method: 'sendABCDEF',
           tojid: '55dbe259a87305c409c43cb6',
           title: 'Mocha Test',
           tag: 'gift, reward',
           body: JSON.stringify({
                                    "content":"Test06",
                                    "extra":"{\"Gold\":5,\"Diamond\":5}"
                                }),
           ttl: -1
       };
       
       var expectCallback = function(res){
           res = Utils.ParseJsonString(res);
           expect(res.err).to.equal(400);
           done();
       }
       
       //Fake server request
       request = new jUnitTest.ServerRequest('./auth', '127.0.0.1', args, expectCallback);
            
      /* request.args = args;
       request.callback = expectCallback;*/
    
       //Send message
       messageModule(request, tokenInfo);
   });
    
   it('Missing arguments', function(done){
       var args = {
           service: 'jmessage',
           method: 'send',
           tojid: '55dbe259a87305c409c43cb6',
           title: 'Mocha Test',
           tag: 'gift, reward',
           body: JSON.stringify({
                                    "content":"Test06",
                                    "extra":"{\"Gold\":5,\"Diamond\":5}"
                                }),
           ttl: 'ABCDEFGH'
       };
       
       var expectCallback = function(res){
           res = Utils.ParseJsonString(res);
           expect(res.err).to.equal(400);
           done();
       }
       
       //Fake server request
       request = new jUnitTest.ServerRequest('./auth', '127.0.0.1', args, expectCallback);
       
     /*  request.args = args;
       request.callback = expectCallback;*/
      
       //Send message
       messageModule(request, tokenInfo);
   });
    
   it('Receiver not found', function(done){
       var args = {
           service: 'jmessage',
           method: 'send',
           tojid: 'ABCDEFGHIJKKKKKKK',
           title: 'Mocha Test',
           tag: 'gift, reward',
           body: JSON.stringify({
                                    "content":"Test06",
                                    "extra":"{\"Gold\":5,\"Diamond\":5}"
                                }),
           ttl: -1
       };
       
      var expectCallback = function(res){
           res = Utils.ParseJsonString(res);
           
           if (res.err == 404)
               expect(res.err).to.equal(404);
           else 
               expect(res.err).to.equal(500);
          
           done();
       }
       
       //Fake server request
       request = new jUnitTest.ServerRequest('./auth', '127.0.0.1', args, expectCallback);
      
      /* request.args = args;
       request.callback = expectCallback;*/
    
       //Send message
       messageModule(request, tokenInfo);
   });
    
   it('Sent mail successfully', function(done){
       var args = {
           service: 'jmessage',
           method: 'send',
           tojid: '55dbe259a87305c409c43cb6',
           title: 'Mocha Test',
           tag: 'gift, reward',
           body: JSON.stringify({
                                    "content":"Test06",
                                    "extra":"{\"Gold\":5,\"Diamond\":5}"
                                }),
           ttl: -1
       };
       
       var expectCallback = function(res){
           res = Utils.ParseJsonString(res);
           expect(res.err).to.equal(0);
           done();
       }
       
       //Fake server request
       request = new jUnitTest.ServerRequest('./auth', '127.0.0.1', args, expectCallback);
       
       /*request.args = args;
       request.callback = expectCallback;*/
    
       //Send message
       messageModule(request, tokenInfo);
   });
});