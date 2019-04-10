const express = require('express');
const router = express.Router();

const trip = require('../model/trips.js');

const stage = require('../model/trip_stages');

const addStageToTrip = async (data) => {
    return Promise.all(
        data.map(
            async element => {
                element.dataValues.stages = await stage.findAll( { where: { refTrip: element.dataValues.id } } );
            }
        )
    );
}

router.get('/', async (req,res) => {
    try {

        let result = await trip.findAll()

        await addStageToTrip(result);

        res.json( {
            result: "OK",
            data: result,
            message: "viajes leídos correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer viajes: '+error
        } );
        console.log(error);
    }
});

router.get('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let result = await trip.findAll({where:{id:id}});

        await addStageToTrip(result);

        res.json( {
            result: "OK",
            data: result,
            message: "viaje leído correctamente"
        } );

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al leer viaje: '+error
        } );
        console.log(error);
    }
});

router.post('/', async (req,res) => {
    try {
        let {description, refVehicle} = req.body;

        let newtrip = await trip.create({
            description,
            refVehicle
        },{
            fields: ["brand","model","plate","publicId","privateId"]
        });

        if (newtrip){
            res.json( {
                result: "OK",
                data: newtrip,
                message: "viaje introducido correctamente"
            } );
        }else{
            res.json( { 
                result:"FAILED",
                data: {},
                message: "Error al insertar viaje" 
            } );
        }

    } catch (error) {
        res.json( { 
            result:"FAILED",
            data: {},
            message: 'Error al insertar viaje: '+error
        } );
        console.log(error);
    }
});

router.put('/:id', async (req,res) => {
    try {
        let {id} = req.params;
        let {description, refVehicle} = req.body;

        let tripMod = await trip.findAll({where:{id:id}});

        if (tripMod.length == 1){
            await tripMod.forEach(async (trip) => {
                trip.update({
                    description: description ? description : tripMod.description,
                    refVehicle: refVehicle ? refVehicle : tripMod.refVehicle,
                });
            });
            res.json( {
                result: "OK",
                data: tripMod,
                message: "viaje actualizado correctamente"
            } );
        }else{
            res.json({ 
                result:"FAILED",
                data: {},
                message: 'Error al actualizar viaje'
            });
        }

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al actualizar viaje: '+error
        });
    }
});

router.delete('/:id', async (req,res) => {
    try {
        let {id} = req.params;

        let deletedRows = await trip.destroy({
            where: {
                id: id
            }
        });

        res.json({ 
            result:"OK",
            data: {},
            message: 'viajes borrados correctamente',
            count: deletedRows
        });

    } catch (error) {
        console.log(error);
        res.json({ 
            result:"FAILED",
            data: {},
            message: 'Error al borrar viaje: '+error
        });
    }
});



module.exports = router;