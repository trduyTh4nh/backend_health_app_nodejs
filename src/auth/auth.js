'use strict'

require('dotenv').config()
const JWT = require('jsonwebtoken')
const { AuthFailureError, BadRequestError } = require('../core/error.response')

const authentication = (req, res, next) => {
    const authenHeader = req.headers['authorization']
    if (!authenHeader) {
        throw new AuthFailureError('Missing authorization header')
    }
    const token = authenHeader.split(' ')[1]
    if (!token) {
        throw new AuthFailureError('Missing authorization token')
    }

    JWT.verify(token, process.env.SECRET, (error, user) => {
        if (error) {
            throw new BadRequestError('Invalid token')
        }
        req.user = user
        next()
    })
}

const HEADER = {
    KEYADMIN: process.env.ADMINKEY
}

const authenticationVersion2 = (req, res, next) => {
    const admin = req.headers[HEADER.KEYADMIN]
    if (admin !== process.env.KEYVERIFICATION) {
        throw new AuthFailureError('You are does not have permission, Just amdin can access!! :))')
    }

    const authenHeader = req.headers['authorization']
    if (!authenHeader) {
        throw new AuthFailureError('Missing authorization header')
    }
    const token = authenHeader.split(' ')[1]
    if (!token) {
        throw new AuthFailureError('Missing authorization token')
    }
    

    JWT.verify(token, process.env.SECRET, (error, user) => {
        if (error) {
            throw new BadRequestError('Invalid token')
        }
        req.user = user
        next()
    })
}


module.exports = {
    authentication,
    authenticationVersion2
}