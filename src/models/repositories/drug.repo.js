'use strict'

const { where } = require('sequelize');
const { Op } = require('sequelize');
const sequelize = require('../../db/init.sequelize');
const { NotFoundError, BadRequestError } = require('../../core/error.response');
const DataTypes = require('sequelize').DataTypes;
const drugModel = require('../drug.model')(sequelize, DataTypes);
const DrugApplication = require("../drugApplication.model")(sequelize, DataTypes);
const DrugApplicationDetail = require("../drugApplicationDetail.model")(sequelize, DataTypes);
const ScheduleDetail = require('../scheduleDetail.model')(sequelize, DataTypes)
const hospitalModel = require('../hospital.model')(sequelize, DataTypes)
const getDrugApplicationByUser = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}
const getDrugApplicationByIdApplication = async (id_app) => {
    return await DrugApplication.findAll({ where: { id: id_app } })
}
const getDrugApplicationDetailFrom = async (id_drug_app) => {
    return await DrugApplicationDetail.findAll({ where: { id_drug_application: id_drug_app } })
}

const getScheduleDetailByAppDrugDetail = async (id_app_detail) => {
    return await ScheduleDetail.findAll({ where: { id_app_detail: id_app_detail } })
}

const getDrugFromId = async (id_drug) => {
    return await drugModel.findOne({
        where: { id_drug: id_drug }
    })
}

const getDrugAppFromId = async (id_drug_app) => {
    return await DrugApplication.findOne({ where: { id: id_drug_app } })
}

const deleteScheduleDetail = async (id_app_detail) => {


    return await DrugApplicationDetail.destroy({
        where: { id_app_detail: id_app_detail }
    })
}

const getListApplicationDetailFrom = async (id_drug_app) => {
    return await DrugApplicationDetail.findAll({
        where: { id_drug_application: id_drug_app }
    })
}

const getDrugDetailById = async (id_app_detail) => {

    return await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_app_detail }
    })
}

const getAllDrugApplicationDetail = async (id_app) => {
    const listDrugApplicationDetail = await DrugApplicationDetail.findAll({ where: { id_drug_application: id_app } })
    const listDrugAppDetail = []
    for (let index = 0; index < listDrugApplicationDetail.length; index++) {
        const idDrug = listDrugApplicationDetail[index].id_drug
        const drug = await drugModel.findOne({ where: { id_drug: idDrug } })

        var result = {
            ...listDrugApplicationDetail[index].dataValues,
            drug: drug
        }
        listDrugAppDetail.push(result)
    }


    return listDrugAppDetail
}

const getAllApplication = async (id_user) => {
    return await DrugApplication.findAll({ where: { id_user: id_user } })
}


const getAllDrug = async () => {
    return await drugModel.findAll()
}


const searchDrug = async (text) => {
    try {
        const drugs = await drugModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${text}%`
                }
            }
        });
        return drugs;
    } catch (error) {
        console.error('Error searching for drugs:', error);
        throw new Error('Could not search for drugs');
    }
};

const decrementDrugUsed = async (id_app_detail) => {
    const foundApplicationDetail = await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_app_detail }
    })

    if (!foundApplicationDetail) {
        throw new NotFoundError('Can not find application detail')
    }

    if (foundApplicationDetail.quantity_used <= 0) {
        throw new NotFoundError('Minium quantity! ')
    }

    await foundApplicationDetail.increment('quantity', {
        by: -1
    })
}

const getApplicationDetailById = async (id_app_detail) => {
    return await DrugApplicationDetail.findOne({
        where: { id_app_detail }
    })
}

const getApplicationByIdApplication = async (id) => {
    return await DrugApplication.findOne({
        where: { id }
    })
}


const scanDrugApplicationUpdate = async (id_user, id_application) => {
    const foundDrugApplication = await DrugApplication.findOne({
        where: { id: id_application }
    })

    // const foundUserInDrugApplication = await DrugApplication.findOne({

    //     where: { id_user: id_user }
    // })
    if (foundDrugApplication.id_user) {
        throw new BadRequestError('You does not have permission!')
    }

    return await DrugApplication.update({
        id_user
    }, {
        where: { id: id_application }
    })
}



// (thêm thuốc custom)
const createApplicationDetail = async ({
    id_drug,
    id_drug_application,
    amount_per_consumption,
    quantity
}) => {


    console.log("id_drug: ", id_drug)
    console.log("id_drug_application: ", id_drug_application)
    console.log("amount_per_consumption: ", amount_per_consumption)
    console.log("quantity: ", quantity)

    return await DrugApplicationDetail.create({
        id_drug,
        id_drug_application,
        quantity_used: 0,
        quantity,
        amount_per_consumption
    })
}

const incrementQuantityUsed = async (id_app_detail) => {
    try {
        const foundApplicationDetail = await DrugApplicationDetail.findOne({ where: { id_app_detail } });

        // Kiểm tra nếu không tìm thấy id_app_detail
        if (!foundApplicationDetail) {
            console.error(`No application detail found for id_app_detail: ${id_app_detail}`);
            throw new Error(`Application detail not found for id_app_detail: ${id_app_detail}`);
        }

        console.log("DEBUG APPLICATION DETAIL: ", foundApplicationDetail.id_app_detail);
        console.log("DEBUG APPLICATION DETAIL: ", foundApplicationDetail.quantity_used);

        // Sử dụng hàm increment để tăng quantity_used
        await foundApplicationDetail.increment('quantity_used', { by: 1 });


        await foundApplicationDetail.reload();

        console.log("UPDATED APPLICATION DETAIL: ", foundApplicationDetail.quantity_used);

        return foundApplicationDetail; // Trả về đối tượng đã được tăng
    } catch (error) {
        console.error(`Error incrementing quantity_used for id_app_detail: ${id_app_detail}`, error);
        throw new Error(`Error incrementing quantity_used: ${error.message}`);
    }
};

const getDrugFromDrugApplicationDetail = async (id_drug_application_detail) => {
    const foundDrugAppDetail = await DrugApplicationDetail.findOne({
        where: { id_app_detail: id_drug_application_detail }
    })

    if (!foundDrugAppDetail) {
        throw new NotFoundError('Not found drug application detail!')
    }

    const result = await drugModel.findOne({
        where: { id_drug: foundDrugAppDetail.id_drug }
    })
    return {
        ...foundDrugAppDetail.dataValues,
        drug: result
    }
}


const getAllHostpital = async () => {
    return await hospitalModel.findAll()
}

const searchHospital = async (keySearch) => {
    console.log("debug keySearch:", keySearch)
    try {
        const hospital = await hospitalModel.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${keySearch}%`
                }
            }
        })
        return hospital
    } catch (error) {
        throw new BadRequestError('Could not search user', error)
    }
}

const getApplicationAppendHospital = async (id_drug_application) => {
    const drugApplication = await getDrugAppFromId(id_drug_application);
    if (!drugApplication) {
        throw new NotFoundError('Not found drug application!')
    }
    const hospitalOfDrugApp = await hospitalModel.findOne({
        where: { id_hospital: drugApplication.id_hospital }
    })

    return {
        ...drugApplication.dataValues,
        hospital: hospitalOfDrugApp
    }
}

const updateImageDrug = async ({
    id_drug, url
}) => {
    const data = `
8    https://shop.mielizia.com/574-medium_default/miele-organic-energy-mix-with-honey-pollen-royal-jelly-250g-jar.jpg
9    https://nhathuocthanthien.com.vn/wp-content/uploads/2022/11/dgm_nttt_siro-probee.jpg
10    https://pk.herbion.com/cdn/shop/files/claree-vitamin-c-1.jpg?v=1696935985
11    https://bizweb.dktcdn.net/thumb/1024x1024/100/375/956/products/6e483391ee11d.jpg?v=1631778478267
12    https://dental.keystoneindustries.com/wp-content/uploads/2015/10/HomeCareFluorideGroup.jpg
13    https://m.media-amazon.com/images/I/61c4bCtVfSL._SL1500_.jpg
14    https://cdn.youmed.vn/tin-tuc/wp-content/uploads/2020/02/levothyrox-100-%CE%BCg-1024x569.jpg
15    https://cdn.health.com.vn/p/now-foods-potassium-chloride-powder-8-oz-227-g-777-733739014504.jpg
16    https://m.media-amazon.com/images/I/417BLbW9BzL.jpg
17    https://pharmog.com/wp/wp-content/uploads/2018/11/Bupropion-150.jpg
18    https://i5.walmartimages.com/asr/8904e94b-4520-4b1f-b5ba-69d4978f3ac6.4f981a184431cd4c9b6ec38d3bb826c9.jpeg
19    https://unionrxs.com/wp-content/uploads/2019/07/3633047L.jpg
20    https://cdn1.skinsafeproducts.com/photo/0ECF66F3947EA7/medium_1578598988.pngPNG?1578598988
21    https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/1148910_front.jpg
22    https://i5.walmartimages.com/seo/Equate-8-Hour-Arthritis-Pain-Relief-Acetaminophen-Extended-Release-Tablets-650mg-325-Count_6235b586-db0e-4729-a51b-ed8645c3deb3.b1f8e0ed0b42e530d0530229bf3d1d38.jpeg
23    https://i5.walmartimages.com/seo/Children-s-Dimetapp-Cold-Cough-Medicine-Antihistamine-Liquid-Grape-Flavor-Alcohol-Free-4-Fl-oz_da7bb3c7-6742-4303-9e15-9afa064e7fdc.fa210e34473746e1e14ecd919cc1833f.jpeg
24    https://www.phshairscience.com/cdn/shop/files/eStore__2502x3348__StemC_CalmingShampoo200ml.jpg?v=1720605071
25    https://vinmec-prod.s3.amazonaws.com/images/20221120_095446_178113_fentanyl-50.max-800x800.jpg
26    https://imgcdn.mckesson.com/CumulusWeb/Images/Original_Image/1148910_front.jpg
27    https://www.dechra-us.com/admin/public/getimage.ashx?Crop=0&Image=/Files/Images/Ecom/Products/US/M220002-Ketamine-Vial-Image-new.jpg&Format=jpg&AlternativeImage=/files/Images/placeholder-image.png&Width=600&Quality=75
28    https://i5.walmartimages.com/seo/Forces-of-Nature-Organic-H-Balm-Daily-Control-Extra-Strength-11-ml_20f077ac-aa3d-430e-bee6-05f46cdc93eb.31ef3c433afa427aad02a42772fdbdc5.jpeg
29    https://m.media-amazon.com/images/I/317YMrWQexL.jpg
30    https://www.allergyeasy.com/wp-content/uploads/2017/03/Food-Allergy-Treatment.jpg
31    https://5.imimg.com/data5/SELLER/Default/2023/3/AB/UU/EL/151880555/lethyrox-50.jpg
32    https://5.imimg.com/data5/SELLER/Default/2023/3/AB/UU/EL/151880555/lethyrox-50.jpg
33    https://www.triselfcare.com/cdn/shop/products/globe_double_antibiotic_ointment_1oz_box__tube_e04443bd-056f-41f4-85d2-f17e18cafbb1.jpg?v=1702334666
34    https://ecopharma.com.vn/wp-content/uploads/2024/03/thuoc-doxagisin.jpg
35    https://m.media-amazon.com/images/I/71O--hRafrL._AC_UF1000,1000_QL80_.jpg
36    https://cdn.health.com.vn/p/now-foods-potassium-chloride-powder-8-oz-227-g-777-733739014504.jpg
37    https://i.ebayimg.com/images/g/MAsAAOSwa9pk9i33/s-l1600.png
38    https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00031431_metformin_500mg_tipharco_4x15_9518_618d_large_3f62cb12df.jpg
39    https://cdn1.skinsafeproducts.com/photo/8DC83B78537769/large_1644551661.pngpng?1644551661
40    https://image.hsv-tech.io/1987x0/bbx/common/be0b9b63-abca-4911-993e-551890a17432.webp
41    https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/00007815_venlafaxine_stada_375_mg_2028_6425_large_02ecdaafa0.jpg
42    https://germiphene.com/wp-content/uploads/2022/02/60-Second-Gel-Strawberry-G6-S.jpg
43    https://i5.walmartimages.com/seo/Coppertone-WaterBabies-SPF-50-Baby-Sunscreen-Lotion-8-Fl-Oz_c2890e67-4c43-4a7c-9969-8fcfbe1f0f50.74484738c9002b8367ba2ab4850e9eaf.jpeg
44    https://curad.com/wp-content/uploads/2020/05/SKU_CUR45585RB_BOX_RIGHT_RGB-1.png
45    https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/IMG_3499_fc069085cd.jpg
46    https://www.vinmec.com/static/uploads/20220218_103635_057360_lidocaine_9_max_1800x1800_jpg_945a2d56aa.jpg
47    https://www.bbalancedmed.com/wp-content/uploads/venus.jpg
48    https://www.vinmec.com/static/uploads/20220324_011913_329230_Donepezil_max_1800x1800_png_02f19f6c3b.png
49    https://i5.walmartimages.com/seo/Allegra-24-Hour-Non-Drowsy-Antihistamine-Allergy-Relief-Medicine-180-mg-Fexofenadine-Tablets-5-Ct_add972e3-e92b-49ee-b53e-5e8237d0d6b6.11dceab26161e892847b097fd162f879.jpeg
50    https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1LMPcHb2nyf4M5i5Wyl5znqTf6hV_1ScMIA&s
51    https://i5.walmartimages.com/asr/d9daecba-772b-4fa5-8daf-4718e754034b.b1537e1f85d2f6ea6469dcbd54c3b809.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF
52    https://image.hsv-tech.io/1920x0/bbx/common/8ecd9f13-275c-40c6-a167-35065653be4d.webp
53    https://suckhoe123.vn/uploads/suc-khoe/2021_05/20210417_075015_440154_thuoc_leucovorin_calc.max-800x800.jpg&w=800&h=646&checkress=70b67c27443e74ad5fdc3cc68e081d18
54    https://cvpproducts.com/wp-content/uploads/2021/06/16104.jpg
55    https://storage.googleapis.com/images-bks-prd-1385851.bks.prd.v8.commerce.mi9cloud.com/product-images/zoom/3c006bbf-7089-4ea6-b230-cd97cdcd6926.jpeg
56    https://images-na.ssl-images-amazon.com/images/I/71YTIg8gf0L.jpg
`;
    const lines = data.trim().split('\n');
    const jsonArray = lines.map(line => {
        const [id, url] = line.split(/\s+/);
        return { id_drug: parseInt(id), url };
    });

    console.log(JSON.stringify(jsonArray, null, 2));

    for (const { id_drug, url } of jsonArray) {
        try {
            await drugModel.update(
                { image: url },
                { where: { id_drug } }
            );
            console.log(`Updated drug with ID ${id_drug} to URL ${url}`);
        } catch (error) {
            console.error(`Failed to update drug with ID ${id_drug}:`, error);
        }
    }

    return {
        status: ""
    }

}

module.exports = {
    getDrugApplicationByUser,
    getDrugApplicationDetailFrom,
    getScheduleDetailByAppDrugDetail,
    getDrugFromId,
    getDrugAppFromId,
    deleteScheduleDetail,
    getListApplicationDetailFrom,
    getDrugDetailById,
    getAllApplication,
    getAllDrugApplicationDetail,
    getAllDrug,
    searchDrug,
    getDrugApplicationByIdApplication,
    decrementDrugUsed,
    getApplicationDetailById,
    getApplicationByIdApplication,
    scanDrugApplicationUpdate,
    createApplicationDetail,
    incrementQuantityUsed,
    getDrugFromDrugApplicationDetail,
    getAllHostpital,
    searchHospital,
    getApplicationAppendHospital,
    updateImageDrug
} 