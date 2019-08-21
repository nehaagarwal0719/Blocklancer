pragma solidity ^0.5.1;
contract freelancer{

    struct work{
        uint id;
        string name;
        address payable owner;
        bool purchased;
    }

    struct bid{
        uint bid_id;
        string name;
        string message;
        uint time;
        uint price;
        address payable bidder;
    }
    
    uint public workCount=0;
    uint public bidCount=0;
    
    mapping (uint=>work) public works;
    mapping (uint=>bid) public bids;
    
    
    event workCreated(
        uint id,
        string name,
        address payable owner,
        bool purchased
    );

    event bidCreated(
        //uint work_id,
        uint bid_id,
        string name,
        string message,
        uint time,
        uint price,
        address payable bidder

        );
    emit bidPurchased(
        uint bid_id,
        string name,
        string message,
        uint time,
        uint price,
        address payable bidder
        );
    
    function createWork(string memory _name)public{
        works[workCount]=work(workCount,_name,msg.sender,false);
        workCount++;
        emit workCreated(workCount,_name,msg.sender,false);
    }

    function createBid( string memory _name, string memory _message, uint _time, uint _price) public{
        bids[bidCount]=bid(bidCount,_name,_message,_time,_price, msg.sender);
        bidCount++;
        emit bidCreated(bidCount,_name,_message,_time,_price, msg.sender);
        
    }

     function purchasebid(uint _id) public payable  {
        //fetch the bid
        bid memory _bid = bids[_id];
        //fetch the owner 
        address payable _seller =_bid.bidder;
        // Make sure the product id is valid

        //require (_product.id >0 && _product.id< productCount);
        // enough ether
         
         require (msg.value >= _bid.bidder);
         //product is not purchased


         //require (!_product.purchased);

         //seller is not buyer


         require (_seller!=msg.sender);
         
         
        //transfer ownership to the buyer
        //_work.owner= msg.sender;
         //mark as purchased
         //_product.purchased = true;
         //update the product
         //products[_id]=_product;
         //pay the seller through ether
         address(_seller).transfer(msg.value);
         //trigger an event

         emit bidPurchased(bidCount,_name,_message,_time,_price, msg.sender);

    }



    
    
}