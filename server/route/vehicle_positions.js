const express = require('express');
const router = express.Router();

const position = require('../model/vehicles.js');

/*router.get('/', async (req,res) => {
    try {

        let result = await position.findAll()

        res.json( {
            result: "OK",
            data: result,
            message: "posiciones leídos correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer posiciones: '+error
        } );
        console.log(error);
    }
});*/

/*router.get('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let result = await vehicle.findAll({where:{id:id}});

        res.json( {
            result: "OK",
            data: result,
            message: "vehículo leído correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer vehículo: '+error
        } );
        console.log(error);
    }
});*/

router.get('/', async (req,res) => {
    try {
        let {latitude,longitude,altitude,time,satellites,speedOTG,course} = req.query;
        
        console.log(latitude+","+longitude+","+altitude+","+time+","+satellites+","+speedOTG+","+course);

        res.json({result:"ok"});
        /*let newvehicle = await vehicle.create({
            brand,
            model,
            plate,
            publicId: randomstring.generate(16),
            privateId: randomstring.generate(16),
        },{
            fields: ["brand","model","plate","publicId","privateId"]
        });

        if (newvehicle){
            res.json( {
                result: "OK",
                data: newvehicle,
                message: "vehículo introducido correctamente"
            } );
        }else{
            res.json( { 
                result:"FAILED",
                data: {},
                message: "Error al insertar vehículo" 
            } );
        }*/

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al insertar vehículo: '+error
        } );
        console.log(error);
    }
});

module.exports = router;