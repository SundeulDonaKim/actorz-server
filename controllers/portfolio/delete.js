const { portfolio } = require("../../mongodb/models");
const { isAuthorized } = require("../tokenHandle");

module.exports = async (req, res) => {
  try{
    const tokenBodyData = isAuthorized(req);
    const { user_id } = req.params;
    // 해당 유저가 맞는지 확인
    if(!tokenBodyData || tokenBodyData.id !== user_id){
      return res.status(401).send({
        data: null,
        message: "Authorization dont exist"
      });
    };

    // 해당 유저의 요청이면, portfolio 내용 삭제
    await portfolio.findOneAndDelete({ user_id })
    .then((pfDate) => {
      res.status(200).send({
        data: {
          id: pfDate._id
        },
        message: "Successfully portfolio delete"
      });
    });
    
  }catch(err){
    console.log(err);
    res.status(500).send({
      data: null,
      message: "Server Error"
    });
  };
};