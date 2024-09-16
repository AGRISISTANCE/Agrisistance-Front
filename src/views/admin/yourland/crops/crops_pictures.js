// crops_pictures.js

import lemon from './pictures/lemon.jpg';
import lentil from './pictures/lentil.jpg';
import lettuce from './pictures/lettuce.jpg';
import lime from './pictures/lime.jpg';
import loquat from './pictures/loquat.jpg';
import longan from './pictures/longan.jpg';
import lychee from './pictures/lychee.jpg';
import mango from './pictures/mango.jpg';
import mandarin from './pictures/mandarin.jpg';
import mulberry from './pictures/mulberry.jpg';
import mung_bean from './pictures/mung bean.jpg';
import mushroom from './pictures/mushroom.jpg';
import mustard from './pictures/mustard.jpg';
import nectarine from './pictures/nectarine.jpg';
import okra from './pictures/okra.jpg';
import olive from './pictures/olive.jpg';
import onion from './pictures/onion.jpg';
import orange from './pictures/orange.jpg';
import oregano from './pictures/oregano.jpg';
import papaya from './pictures/papaya.jpg';
import parsnip from './pictures/parsnip.jpg';
import passion_fruit from './pictures/passion fruit.jpg';
import pea from './pictures/pea.jpg';
import peach from './pictures/peach.jpg';
import pear from './pictures/pear.jpg';
import peppermint from './pictures/peppermint.jpg';
import persimmon from './pictures/persimmon.jpg';
import pineapple from './pictures/pineapple.jpg';
import plum from './pictures/plum.jpg';
import pomegranate from './pictures/pomegranate.jpg';
import potato from './pictures/potato.jpg';
import prickly_pear from './pictures/prickly pear.jpg';
import pumpkin from './pictures/pumpkin.jpg';
import hemp from './pictures/hemp.jpg';
import honeydew from './pictures/honeydew.jpg';
import jackfruit from './pictures/jackfruit.jpg';
import jabuticaba from './pictures/jabuticaba.jpg';
import kale from './pictures/kale.jpg';
import kiwi from './pictures/kiwi.jpg';
import kohlrabi from './pictures/kohlrabi.jpg';
import kumquat from './pictures/kumquat.jpg';
import lavender from './pictures/lavender.jpg';
import apricot from './pictures/apricot.jpg';
import artichoke from './pictures/artichoke.jpg';
import asparagus from './pictures/asparagus.jpg';
import avocado from './pictures/avocado.jpg';
import banana from './pictures/banana.jpg';
import barley from './pictures/barley.jpg';
import basil from './pictures/basil.jpg';
import bean from './pictures/bean.jpg';
import beetroot from './pictures/beetroot.jpg';
import bell_pepper from './pictures/bell pepper.jpg';
import black_gram from './pictures/black gram.jpg';
import blackberry from './pictures/blackberry.jpg';
import blueberry from './pictures/blueberry.jpg';
import broccoli from './pictures/broccoli.jpg';
import buckwheat from './pictures/buckwheat.jpg';
import cabbage from './pictures/cabbage.jpg';
import carrot from './pictures/carrot.jpg';
import cantaloupe from './pictures/cantaloupe.jpg';
import cauliflower from './pictures/cauliflower.jpg';
import celery from './pictures/celery.jpg';
import chickpea from './pictures/chickpea.jpg';
import chili_pepper from './pictures/chili pepper.jpg';
import clementine from './pictures/clementine.jpg';
import coconut from './pictures/coconut.jpg';
import corn from './pictures/corn.jpg';
import cranberry from './pictures/cranberry.jpg';
import cucumber from './pictures/cucumber.jpg';
import custard_apple from './pictures/custard apple.jpg';
import date from './pictures/date.jpg';
import dragon_fruit from './pictures/dragon fruit.jpg';
import durian from './pictures/durian.jpg';
import elderberry from './pictures/elderberry.jpg';
import fennel from './pictures/fennel.jpg';
import fig from './pictures/fig.jpg';
import flax from './pictures/flax.jpg';
import garlic from './pictures/garlic.jpg';
import ginger from './pictures/ginger.jpg';
import grape from './pictures/grape.jpg';
import grapefruit from './pictures/grapefruit.jpg';
import green_bean from './pictures/green bean.jpg';
import guava from './pictures/guava.jpg';
import turnip from './pictures/turnip.jpg';
import vanilla from './pictures/vanilla.jpg';
import walnut from './pictures/walnut.jpg';
import watermelon from './pictures/watermelon.jpg';
import wheat from './pictures/wheat.jpg';
import yam from './pictures/yam.jpg';
import zucchini from './pictures/zucchini.jpg';
import alfalfa from './pictures/alfalfa.jpg';
import almond from './pictures/almond.jpg';
import amaranth from './pictures/amaranth.jpg';
import apple from './pictures/apple.jpg';
import quince from './pictures/quince.jpg';
import radish from './pictures/radish.jpg';
import raspberry from './pictures/raspberry.jpg';
import red_clover from './pictures/red clover.jpg';
import rye from './pictures/rye.jpg';
import salad_green from './pictures/salad green.jpg';
import sorghum from './pictures/sorghum.jpg';
import spearmint from './pictures/spearmint.jpg';
import spinach from './pictures/spinach.jpg';
import starfruit from './pictures/starfruit.jpg';
import strawberry from './pictures/strawberry.jpg';
import sunflower from './pictures/sunflower.jpg';
import sweet_potato from './pictures/sweet potato.jpg';
import tangerine from './pictures/tangerine.jpg';
import tobacco from './pictures/tobacco.jpg';
import tomato from './pictures/tomato.jpg';

// Default image path if needed
import defaultCropImage from './pictures/default-crop-image.jpg';

const crops = {
    lemon,
    lentil,
    lettuce,
    lime,
    loquat,
    longan,
    lychee,
    mango,
    mandarin,
    mulberry,
    mung_bean,
    mushroom,
    mustard,
    nectarine,
    okra,
    olive,
    onion,
    orange,
    oregano,
    papaya,
    parsnip,
    passion_fruit,
    pea,
    peach,
    pear,
    peppermint,
    persimmon,
    pineapple,
    plum,
    pomegranate,
    potato,
    prickly_pear,
    pumpkin,
    hemp,
    honeydew,
    jackfruit,
    jabuticaba,
    kale,
    kiwi,
    kohlrabi,
    kumquat,
    lavender,
    apricot,
    artichoke,
    asparagus,
    avocado,
    banana,
    barley,
    basil,
    bean,
    beetroot,
    bell_pepper,
    black_gram,
    blackberry,
    blueberry,
    broccoli,
    buckwheat,
    cabbage,
    carrot,
    cantaloupe,
    cauliflower,
    celery,
    chickpea,
    chili_pepper,
    clementine,
    coconut,
    corn,
    cranberry,
    cucumber,
    custard_apple,
    date,
    dragon_fruit,
    durian,
    elderberry,
    fennel,
    fig,
    flax,
    garlic,
    ginger,
    grape,
    grapefruit,
    green_bean,
    guava,
    turnip,
    vanilla,
    walnut,
    watermelon,
    wheat,
    yam,
    zucchini,
    alfalfa,
    almond,
    amaranth,
    apple,
    quince,
    radish,
    raspberry,
    red_clover,
    rye,
    salad_green,
    sorghum,
    spearmint,
    spinach,
    starfruit,
    strawberry,
    sunflower,
    sweet_potato,
    tangerine,
    tobacco,
    tomato,
    'default-crop-image': defaultCropImage, // Default image if crop is not found
};

export default crops;
