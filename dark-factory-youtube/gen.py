#!/usr/bin/env python3

import math

countries = [
    ("Kenya","East Africa","Pop: 56M","tier-1","TIER 1",[("AI Ecosystem",88,"green"),("Payments",95,"green"),("Political",70,"blue"),("Speed-to-Scale",90,"green"),("Young Pop.",85,"green")],"A"),
    ("Nigeria","West Africa","Pop: 230M","tier-1","TIER 1",[("AI Ecosystem",82,"green"),("Payments",88,"green"),("Political",55,"orange"),("Speed-to-Scale",85,"green"),("Young Pop.",92,"green")],"A"),
    ("Rwanda","East Africa","Pop: 14M","tier-1","TIER 1",[("AI Ecosystem",85,"green"),("Payments",80,"green"),("Political",88,"green"),("Speed-to-Scale",82,"green"),("Young Pop.",80,"green")],"A-"),
    ("Ghana","West Africa","Pop: 34M","tier-1","TIER 1",[("AI Ecosystem",78,"blue"),("Payments",84,"green"),("Political",75,"blue"),("Speed-to-Scale",80,"green"),("Young Pop.",78,"green")],"A-"),
    ("Brazil","Latin America","Pop: 215M","tier-2","TIER 2",[("AI Ecosystem",90,"green"),("Payments",92,"green"),("Political",60,"orange"),("Speed-to-Scale",85,"green"),("Young Pop.",60,"blue")],"B+"),
    ("Thailand","Southeast Asia","Pop: 71M","tier-2","TIER 2",[("AI Ecosystem",84,"green"),("Payments",88,"green"),("Political",58,"orange"),("Speed-to-Scale",75,"blue"),("Young Pop.",48,"orange")],"B"),
    ("Morocco","North Africa","Pop: 37M","tier-2","TIER 2",[("AI Ecosystem",72,"blue"),("Payments",75,"blue"),("Political",68,"blue"),("Speed-to-Scale",72,"blue"),("Young Pop.",65,"blue")],"B"),
    ("C\u00f4te d'Ivoire","West Africa","Pop: 31M","tier-2","TIER 2",[("AI Ecosystem",65,"blue"),("Payments",70,"blue"),("Political",55,"orange"),("Speed-to-Scale",72,"blue"),("Young Pop.",88,"green")],"B"),
    ("Tunisia","North Africa","Pop: 12M","tier-2","TIER 2",[("AI Ecosystem",68,"blue"),("Payments",70,"blue"),("Political",50,"orange"),("Speed-to-Scale",68,"blue"),("Young Pop.",60,"blue")],"B"),
    ("Uganda","East Africa","Pop: 49M","tier-2","TIER 2",[("AI Ecosystem",62,"blue"),("Payments",68,"blue"),("Political",58,"orange"),("Speed-to-Scale",72,"blue"),("Young Pop.",90,"green")],"B-"),
    ("Botswana","Southern Africa","Pop: 2.6M","tier-2","TIER 2",[("AI Ecosystem",70,"blue"),("Payments",80,"green"),("Political",85,"green"),("Speed-to-Scale",65,"blue"),("Young Pop.",62,"blue")],"B"),
    ("Tanzania","East Africa","Pop: 68M","tier-3","TIER 3",[("AI Ecosystem",58,"blue"),("Payments",62,"blue"),("Political",65,"blue"),("Speed-to-Scale",65,"blue"),("Young Pop.",92,"green")],"C+"),
    ("Zimbabwe","Southern Africa","Pop: 17M","tier-3","TIER 3",[("AI Ecosystem",52,"orange"),("Payments",55,"orange"),("Political",38,"red"),("Speed-to-Scale",55,"orange"),("Young Pop.",85,"green")],"C"),
    ("Mozambique","Southern Africa","Pop: 33M","tier-3","TIER 3",[("AI Ecosystem",50,"orange"),("Payments",58,"orange"),("Political",48,"orange"),("Speed-to-Scale",58,"orange"),("Young Pop.",90,"green")],"C"),
    ("Eswatini","Southern Africa","Pop: 1.2M","tier-3","TIER 3",[("AI Ecosystem",52,"orange"),("Payments",62,"blue"),("Political",58,"orange"),("Speed-to-Scale",52,"orange"),("Young Pop.",78,"green")],"C"),
    ("Malawi","Southern Africa","Pop: 21M","tier-3","TIER 3",[("AI Ecosystem",48,"orange"),("Payments",55,"orange"),("Political",52,"orange"),("Speed-to-Scale",55,"orange"),("Young Pop.",92,"green")],"C"),
    ("Guinea","West Africa","Pop: 14M","tier-3","TIER 3",[("AI Ecosystem",50,"orange"),("Payments",55,"orange"),("Political",48,"orange"),("Speed-to-Scale",52,"orange"),("Young Pop.",88,"green")],"C"),
    ("Sudan","East Africa","Pop: 50M","tier-4","TIER 4",[("AI Ecosystem",42,"orange"),("Payments",45,"orange"),("Political",25,"red"),("Speed-to-Scale",42,"orange"),("Young Pop.",88,"green")],"D"),
    ("DRC","Central Africa","Pop: 105M","tier-4","TIER 4",[("AI Ecosystem",40,"orange"),("Payments",42,"orange"),("Political",28,"red"),("Speed-to-Scale",40,"orange"),("Young Pop.",92,"green")],"D"),
    ("Chad","Central Africa","Pop: 18M","tier-4","TIER 4",[("AI Ecosystem",38,"orange"),("Payments",40,"orange"),("Political",25,"red"),("Speed-to-Scale",38,"orange"),("Young Pop.",90,"green")],"D"),
    ("Guinea-Bissau","West Africa","Pop: 2M","tier-4","TIER 4",[("AI Ecosystem",42,"orange"),("Payments",48,"orange"),("Political",45,"orange"),("Speed-to-Scale",45,"orange"),("Young Pop.",85,"green")],"D"),
    ("Cent.Afr.Rep.","Central Africa","Pop: 6M","tier-4","TIER 4",[("AI Ecosystem",35,"red"),("Payments",38,"red"),("Political",18,"red"),("Speed-to-Scale",35,"orange"),("Young Pop.",88,"green")],"D"),
    ("Venezuela","South America","Pop: 28M","tier-4","TIER 4",[("AI Ecosystem",40,"orange"),("Payments",38,"red"),("Political",22,"red"),("Speed-to-Scale",40,"orange"),("Young Pop.",72,"blue")],"D"),
]
print("Generator script written OK")
