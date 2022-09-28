// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract WildListNFT is Ownable, ERC721A {

    enum SaleConfig {
        WHITELIST,
        PUBLIC
    }

    uint256 public maxSupply = 10000;
    //uint256 public totalSupply = 0; // initally zero because no token is minted, increments on token Mint
    SaleConfig public saleConfig = SaleConfig.WHITELIST;
    bool public mintStatus = false;
    bool public revealed = false;
    bool public publicMintStatus=false;
    bool public whiteListMintStatus=false;
    string private baseUri;
    string private notRevealedUri;
    string private baseExtension = ".json";
    address public ownerAddress;
    address payable public contractownerAddress;

    
    // contract deployment details : "WildList","WLDLST","ipfs://QmTBLmWzueEkFNPZSHADHchQBv6dPtbs59YJ79wKqaBtRS/","ipfs://QmegZthBEZ79JmPy72TfZUmcgPDhvpNdHUFUR3DdC5GRDz/"

    constructor(
        string memory name,
        string memory symbol,
        string memory _baseuri,
        string memory _notRevealedUri
    ) ERC721A(name, symbol) {
        baseUri = _baseuri;
        notRevealedUri = _notRevealedUri;
        ownerAddress= msg.sender;
        contractownerAddress= payable(msg.sender);
    }
    
    
  struct mintMap {
  
        // Declaring different data types
        uint tokenMinted;
        bool WhiteListStatus;

    }
      
    // Creating mapping
    mapping (
      address => mintMap) public mintDetails;
     address[] whitelistAccs;
    //  <-    ONLY OWNER  ->  //

    function withDraw() external onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

     function withDrawonMint() internal returns (string memory) {
       payable(contractownerAddress).transfer(address(this).balance);
    }

    function setNotRevealedUri(string memory _notRevealedUri)
        external
        onlyOwner
    {
        notRevealedUri = _notRevealedUri;
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    function setMaxSupply(uint256 _maxSupply) external onlyOwner {
        maxSupply = _maxSupply;
    }

    function setPublicSale(bool _status) external onlyOwner {
        publicMintStatus=_status;
    }

    function setWhiteListSale(bool _status) external onlyOwner {
        whiteListMintStatus=_status;
    }

    function getBalanceInSC()  external onlyOwner returns (uint){
    return address(this).balance;
    }
    function addWhitelist(address[] memory _addwhitelist) external onlyOwner {
         for (uint i=0; i<_addwhitelist.length; i++) {
                whitelistAccs.push(_addwhitelist[i]);
                mintDetails[_addwhitelist[i]].WhiteListStatus=true;
         }
       
    }
    function removeWhiteList(address[] memory _addwhitelist) external onlyOwner{
          for (uint i=0; i<_addwhitelist.length; i++) {
                mintDetails[_addwhitelist[i]].WhiteListStatus=false;
         }
    }
    
    function getSaleType() public returns (string memory) {
        if(saleConfig==SaleConfig.PUBLIC){
            return "public";
        }
        else if(saleConfig==SaleConfig.WHITELIST){
            return "whitelist";
        }
    }

    function setMintStatus(bool status) external onlyOwner {
        mintStatus = status;
    }

    function setRevealed(bool _revealed) external onlyOwner {
        revealed = _revealed;
    }

    //  <-    MODIFIER  ->  //

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "This call is from Another Contract");
        _;
    }

    //  <-  WHITELIST MINT => PRICE = 0.05, MAX MINT = 3    ->   //

    uint256 public whiteListPrice = 0.055 ether;
    uint256 public maxWhiteListMint = 3;

    function setWhiteListPrice(uint256 _whiteListPrice) external onlyOwner {
        whiteListPrice = _whiteListPrice;
    }

    function setMaxWhiteListMint(uint256 amount) external onlyOwner {
        maxWhiteListMint = amount;
    }

    function getWhitelistStatus(address) public returns (bool) {
        address userAddress=msg.sender;
        return mintDetails[userAddress].WhiteListStatus;
    }
    
    function getTokenMintedCount() public returns (uint) {
        address userAddress=msg.sender;
        return mintDetails[userAddress].tokenMinted;
    }
   
    function whiteListMint(uint256 quantity) external payable callerIsUser {
        require(mintStatus == true, "Mint is not started yet or has finished.");
        
        require(
            whiteListMintStatus==true,
            "WhiteList Mint ended or not started"
        );
        bool wlstat=mintDetails[msg.sender].WhiteListStatus;
        require(wlstat==true,"The address is not Whitelisted!");
        require(msg.value >= quantity * whiteListPrice, "Mint Price is more");
          require(
            totalSupply() + quantity <= maxSupply,
            "Not enough tokens left to be minted."
        );

       require(mintDetails[msg.sender].tokenMinted < maxPublicMint, "Can't mint more than max limit");
     //for(uint256 i=0;i< quantity; i++){
      //      uint256 newTokenId=totalSupply()+1;
         //   totalSupply();
          
       // }
        _safeMint(msg.sender, quantity);
        mintDetails[msg.sender].tokenMinted=mintDetails[msg.sender].tokenMinted + quantity ;
        returnExtra(quantity * whiteListPrice);
        withDrawonMint();
    }

    function centralizedMint(uint256 quantity) external payable callerIsUser{
        require(mintStatus == true, "Mint is not started yet or has finished.");
           require(
            totalSupply() + quantity <= maxSupply,
            "Not enough tokens left to be minted."
        );
  
        require(mintDetails[msg.sender].tokenMinted < maxPublicMint, "Can't mint more than max limit");
         _safeMint(msg.sender, quantity);
            // for(uint256 i=0;i< quantity; i++){
         //   uint256 newTokenId=totalSupply()+1;
           // totalSupply()++;
           
        //}

        mintDetails[msg.sender].tokenMinted=mintDetails[msg.sender].tokenMinted + quantity ;
    }
    //    <-  PUBLIC MINT => PRICE = 0.075, MAX MINT = 3     ->  //

    uint256 public publicPrice = 0.075 ether;
    uint256 public maxPublicMint = 3;

    function setPublicPrice(uint256 _publicPrice) external onlyOwner {
        publicPrice = _publicPrice;
    }

    function setMaxPublicMint(uint256 amount) external onlyOwner {
        maxPublicMint = amount;
    }

    function publicMint(uint256 quantity) external payable callerIsUser {
        require(mintStatus == true, "Mint is not started yet or has finished.");
        require(
            publicMintStatus==true,
            "Public Mint ended or not started"
        );
        require(msg.value >= quantity * publicPrice, "Mint Price is more");
        require(
            totalSupply() + quantity <= maxSupply,
            "Not enough tokens left to be minted."
        );
        require(mintDetails[msg.sender].tokenMinted < maxPublicMint, "Can't mint more than max limit");
        _safeMint(msg.sender, quantity);
        mintDetails[msg.sender].tokenMinted=mintDetails[msg.sender].tokenMinted + quantity ;
        returnExtra(quantity * publicPrice);
        withDrawonMint();
    }

    function returnExtra(uint256 price) private {
        // require(msg.value >= price, "Need to send more ETH.");
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }

    //    <-    TOKEN URI   ->  //
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();

        string memory baseURI = _baseURI();
        if (revealed) {
            return
                string(abi.encodePacked(baseURI, _toString(tokenId), baseExtension));
        } else {
            return notRevealedUri;
        }
    }
}
