const getOpenId = require('./getOpenId/index')
const getMiniProgramCode = require('./getMiniProgramCode/index')
const createCollection = require('./createCollection/index')
const selectRecord = require('./selectRecord/index')
const updateRecord = require('./updateRecord/index')
const sumRecord = require('./sumRecord/index')
const getWorldRank = require('./getWorldRank/index')
const addWorldRank = require('./addWorldRank/index')
const createMatch = require('./createMatch/index')
const joinMatch = require('./joinMatch/index')
const getMatchForRecording = require('./getMatchForRecording/index')
const submitMatchResult = require('./submitMatchResult/index')
const getMatches = require('./getMatches/index')
const getMyMatches = require('./getMyMatches/index')


// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context)
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context)
    case 'createCollection':
      return await createCollection.main(event, context)
    case 'selectRecord':
      return await selectRecord.main(event, context)
    case 'updateRecord':
      return await updateRecord.main(event, context)
    case 'sumRecord':
      return await sumRecord.main(event, context)
    case 'getWorldRank':
      return await getWorldRank.main(event, context)
    case 'addWorldRank':
      return await addWorldRank.main(event, context)
    case 'createMatch':
      return await createMatch.main(event, context)
    case 'joinMatch':
      return await joinMatch.main(event, context)
    case 'getMatchForRecording':
      return await getMatchForRecording.main(event, context)
    case 'submitMatchResult':
      return await submitMatchResult.main(event, context)
    case 'getMatches':
      return await getMatches.main(event, context)
    case 'getMyMatches':
      return await getMyMatches.main(event, context)
  }
}
