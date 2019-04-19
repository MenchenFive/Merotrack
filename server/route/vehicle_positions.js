const express = require('express');
const router = express.Router();
const position = require('../model/vehicle_position.js');
const vehicle = require('../model/vehicles.js');
const coordinateParser = require('coordinate-parser');
const md5 = require('md5');

function addspace (input) {
    let indexOfPoint = input.indexOf('.')-2;
    return input.substr(0, indexOfPoint) + ' ' + input.substr(indexOfPoint);   
};

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
        let {latitude,longitude,time,satellites,speed,course,public,sum} = req.query;
        
        console.log(latitude+","+longitude+","+time+","+satellites+","+speed+","+course+","+public+","+sum);

        let vehic = await vehicle.findOne( { where: { publicId: public } } );

        if (md5(latitude+longitude+time+public+vehic.privateId) == sum){
            let decPosition = new coordinateParser(addspace(latitude)+ " , " +addspace(longitude));

            res.json({
                result: "ok",
                data: decPosition,
                vehiclesdf: vehic
            });

        }else{
            res.json( { 
                result:"FAILED",
                data: {},
                message: 'Error al insertar posicion: hash invalido'
            } );
        }

        
        
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
            message: 'Error al insertar posicion: '+error
        } );
        console.log(error);
    }
});

module.exports = router;