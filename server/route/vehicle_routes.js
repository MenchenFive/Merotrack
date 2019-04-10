const express = require('express');
const router = express.Router();

const vehicle = require('../model/vehicles.js');

const randomstring = require("randomstring");

router.get('/', async (req,res) => {
    try {

        let result = await vehicle.findAll()

        res.json( {
            result: "OK",
            data: result,
            message: "vehículos leídos correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer vehículos: '+error
        } );
        console.log(error);
    }
});

router.get('/:id', async (req,res) => {
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
});

router.post('/', async (req,res) => {
    try {
        let {brand, model, plate} = req.body;

        let newvehicle = await vehicle.create({
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
        }

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al insertar vehículo: '+error
        } );
        console.log(error);
    }
});

router.put('/:id', async (req,res) => {
    try {
        let {id} = req.params;
        let {brand, model, plate} = req.body;

        let vehicleMod = await vehicle.findAll({where:{id:id}});

        if (vehicleMod.length == 1){
            await vehicleMod.forEach(async (vehicle) => {
                vehicle.update({
                    brand: brand ? brand : vehicleMod.brand,
                    model: model ? model : vehicleMod.model,
                    plate: plate ? plate : vehicleMod.plate,
                });
            });
            res.json( {
                result: "OK",
                data: vehicleMod,
                message: "vehículo actualizado correctamente"
            } );
        }else{
            res.json({ 
                result:"FAILED",
                data: {},
                message: 'Error al actualizar vehículo'
            });
        }

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al actualizar vehículo: '+error
        });
    }
});

router.delete('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let deletedRows = await vehicle.destroy({
            where: {
                id: id
            }
        });

        res.json({ 
            result:"OK",
            data: {},
            message: 'vehículos borrados correctamente',
            count: deletedRows
        });

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al borrar vehículo: '+error
        });
    }
});



module.exports = router;