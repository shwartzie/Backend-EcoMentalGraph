const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')
const utilService = require('../../services/util.service.js')
async function query(filterBy = {}) {
	try {
		const criteria = _buildCriteria(filterBy)
		const collection = await dbService.getCollection('report')
		const reports = await collection.find(criteria).toArray()
		// var reports = await collection.aggregate([
		//     {
		//         $match: criteria
		//     },
		//     {
		//         $lookup:
		//         {
		//             localField: 'byUserId',
		//             from: 'user',
		//             foreignField: '_id',
		//             as: 'byUser'
		//         }
		//     },
		//     {
		//         $unwind: '$byUser'
		//     },
		//     {
		//         $lookup:
		//         {
		//             localField: 'aboutUserId',
		//             from: 'user',
		//             foreignField: '_id',
		//             as: 'aboutUser'
		//         }
		//     },
		//     {
		//         $unwind: '$aboutUser'
		//     }
		// ]).toArray()
		// reports = reports.map(report => {
		//     report.byUser = { _id: report.byUser._id, fullname: report.byUser.fullname }
		//     report.aboutUser = { _id: report.aboutUser._id, fullname: report.aboutUser.fullname }
		//     delete report.byUserId
		//     delete report.aboutUserId
		//     return report
		// })
		return reports
	} catch (err) {
		logger.error('cannot find reports', err)
		throw err
	}
}

async function remove(reportId) {
	try {
		const store = asyncLocalStorage.getStore()
		const { loggedinUser } = store
		const collection = await dbService.getCollection('report')
		// remove only if user is owner/admin
		const criteria = { _id: ObjectId(reportId) }
		if (!loggedinUser.isAdmin) criteria.byUserId = ObjectId(loggedinUser._id)
		const { deletedCount } = await collection.deleteOne(criteria)
		return deletedCount
	} catch (err) {
		logger.error(`cannot remove report ${reportId}`, err)
		throw err
	}
}

async function update(report) {
	try {
		var id = ObjectId(report._id)
		delete report._id
		const collection = await dbService.getCollection('report')
		await collection.updateOne({ _id: id }, { $set: { ...report } })
		report._id = id
		return report
	} catch (err) {
		logger.error(`cannot update report ${report._id}`, err)
		throw err
	}
}

async function getById(reportId) {
	try {
		const collection = await dbService.getCollection('report')
		const report = collection.findOne({ _id: ObjectId(reportId) })
		return report
	} catch (err) {
		logger.error(`while finding report ${reportId}, err`)
		throw err
	}
}

async function add(report, user) {
    try {
        const reportToAdd = {
            byUserId: ObjectId(report.byUserId),
            aboutUserId: ObjectId(report.aboutUserId),
            title: report.title,
            title: "Robot dev proj",
            archivedAt: null,
            createdAt: Date.now(),
            isStatic: false,
            isStarred: false,
            createdBy: user,
            style: {
                backgroundImg: "https://wallpapercave.com/wp/wp4676582.jpg",
            },
            labels: [
                { id: "r101", title: "Done", color: "#61bd4f" },
                { id: "r102", title: "Progress", color: "#61bd33" },
            ],
            members: [user],
            groups: [
                {
                    id: utilService.makeId(),
                    title: "Group 1",
                    archivedAt: 1589983468418,
                    type: "container",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "Replace logo",
                            members: [],
                            type: "draggable",
                            createdAt: null,
                            dueDate: null,
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "Add Samples",
                            members: [],
                            type: "draggable",
                            createdAt: null,
                            dueDate: null,
                            activites: []
                        },
                    ],
                    style: {},
                },
                {
                    id: utilService.makeId(),
                    title: "Group title",
                    archivedAt: 1589983468418,
                    type: "container",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "try to find a reason to live",
                            members: [],
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "learn css",
                            members: [],
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            activites: []
                        },
                    ],
                    style: {},
                },
                {
                    id: utilService.makeId(),
                    title: "more demo",
                    archivedAt: 1589983468418,
                    type: "container",
                    tasks: [
                        {
                            id: utilService.makeId(),
                            title: "add tasks",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "add labels",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "fix modal",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "fix dnd",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "more modals",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "change font",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "more logos",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "eat healthy",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "workout",
                            type: "draggable",
                            description: "",
                            createdAt: null,
                            dueDate: null,
                            members: [],
                            activites: []
                        },
                        {
                            id: utilService.makeId(),
                            title: "Group 1",
                            archivedAt: 1589983468418,
                            type: "container",
                            tasks: [
                                {
                                    id: utilService.makeId(),
                                    title: "Replace logo",
                                    members: [],
                                    type: "draggable",
                                    createdAt: null,
                                    dueDate: null,
                                    activites: []
                                },
                                {
                                    id: utilService.makeId(),
                                    title: "Add Samples",
                                    members: [],
                                    type: "draggable",
                                    createdAt: null,
                                    dueDate: null,
                                    activites: []
                                },
                            ],
                            style: {},
                        },
                    ],
                    activities: [
                        {
                            id: utilService.makeId(),
                            txt: "Changed Color",
                            createdAt: 154514,
                            byMember: [],
                            task: "Replace Logo",
                        },
                    ],
                    cmpsOrder: [
                        "status-picker",
                        "member-picker",
                        "date-picker",
                    ],
                    isRecentlyViewed: true,
                    byUserId: "62dfd7695e8559ec9fbd714b",
                },
            ],
            activities: [],
        }
        const collection = await dbService.getCollection("report")
        await collection.insertOne(reportToAdd)
        return reportToAdd
    } catch (err) {
        logger.error("cannot insert report", err)
        throw err
    }
}

function _buildCriteria(filterBy) {
	const criteria = {}
	if (filterBy.byUserId) criteria.byUserId = filterBy.byUserId
	return criteria
}



module.exports = {
	query,
	remove,
	add,
	getById,
	update
}
