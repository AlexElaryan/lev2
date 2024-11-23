$(async function () {
    const data = await getData();
    const colors = await getColor();
    let question = 0;
    let stage = 1;
    let {maxScore} = data.find(item => item['stage'] === stage);
    let currentScore = {};
    let totalScore = [{stage: 1, answers: []}, {stage: 2, answers: []}, {stage: 3, answers: []}];
    let finalResult;
    setInitialAnswers(stage, data);

    const testResult = [
        {
            "stage": 1,
            "answers": [
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                },
                {
                    "0": 2,
                    "1": 2
                }
            ]
        },
        {
            "stage": 2,
            "answers": [
                {
                    "0": 2,
                    "1": 2,
                    "2": 0,
                    "3": 3
                },
                {
                    "0": 1,
                    "1": 0,
                    "2": 3,
                    "3": 2
                },
                {
                    "0": 3,
                    "1": 1,
                    "2": 2,
                    "3": 0
                },
                {
                    "0": 0,
                    "1": 2,
                    "2": 1,
                    "3": 3
                },
                {
                    "0": 3,
                    "1": 1,
                    "2": 2,
                    "3": 0
                },
                {
                    "0": 1,
                    "1": 2,
                    "2": 0,
                    "3": 3
                },
                {
                    "0": 1,
                    "1": 3,
                    "2": 0,
                    "3": 2
                },
                {
                    "0": 1,
                    "1": 3,
                    "2": 0,
                    "3": 2
                },
                {
                    "0": 1,
                    "1": 3,
                    "2": 0,
                    "3": 2
                },
                {
                    "0": 1,
                    "1": 3,
                    "2": 0,
                    "3": 2
                }
            ]
        },
        {
            "stage": 3,
            "answers": [
                {
                    "0": 2,
                    "1": 6,
                    "2": 0,
                    "3": 2
                },
                {
                    "0": 2,
                    "1": 6,
                    "2": 0,
                    "3": 4
                },
                {
                    "0": 2,
                    "1": 6,
                    "2": 0,
                    "3": 4
                },
                {
                    "0": 2,
                    "1": 4,
                    "2": 0,
                    "3": 6
                },
                {
                    "0": 2,
                    "1": 4,
                    "2": 0,
                    "3": 6
                },
                {
                    "0": 2,
                    "1": 4,
                    "2": 0,
                    "3": 6
                },
                {
                    "0": 4,
                    "1": 6,
                    "2": 2,
                    "3": 0
                }
            ]
        }
    ];

    const replyRow = $('.reply-row');
    const nextStage = $('.next-stage');
    const nextQuestion = $('.next-question');
    const prevQuestion = $('.prev-question');
    const step = $('.step');
    const textRow = $('.text-row');
    const maxQuestions = $('.max-questions');
    const currentQuestion = $('.current-question');
    const testPopupWrapper = $('.test-popup-wrapper');
    const popupCloseButton = $('.test-popup-wrapper .test-popup .close-button');
    const popupNextStage = $('.popup-next-stage');
    const popupBackButton = $('.popup-back-button');
    const popupFinalStageButton = $('.popup-final-stage');
    const stepsRow = $('.steps-row');
    const testPopup = $('.test-popup');
    const nextStageNumber = $('.next-stage .number');
    const resultsRow = $('.result-row');
    const resultForm = $('.result-form');

    updateSlideLine(stage, data);
    update(stage, data);

    function setAnswersValues(currentScore, maxScore, isActive) {
        if (stage === 1) {
            $('.reply-box').each((index, item) => {
                if (isActive) {
                    const relevantItem = $(item).find(`.answer-button`);
                    relevantItem.removeClass('active');
                    relevantItem.nextUntil('').attr('disabled', false);
                    relevantItem.prevUntil('').attr('disabled', false);
                    currentScore[index] = null;
                } else {
                    if (currentScore[index] !== null && currentScore[index] !== undefined) {
                        const relevantItem = $(item).find(`.answer-button[data-answer=${currentScore[index]}]`);
                        relevantItem.addClass('active');
                        relevantItem.nextUntil('').attr('disabled', true);
                        relevantItem.prevUntil('').attr('disabled', true);
                    } else {
                        const answer = maxScore - Object.values(currentScore).reduce((a, b) => a + b, 0);
                        currentScore[index] = answer;
                        const relevantItem = $(item).find(`.answer-button[data-answer=${answer}]`);
                        relevantItem.addClass('active');
                        relevantItem.nextUntil('').attr('disabled', true);
                        relevantItem.prevUntil('').attr('disabled', true);
                    }
                }
            });
        } else {
            $('.reply-box').each((boxIndex, item) => {
                $(item).find('.answer-button').each((index, button) => {
                    const buttonDataAnswer = Number($(button).attr('data-answer'));
                    if (!isActive) {
                        if (currentScore[boxIndex] === buttonDataAnswer) {
                            $(button).addClass('active');
                            $(button).prevUntil('').attr('disabled', true);
                            $(button).nextUntil('').attr('disabled', true);
                        } else if (Object.values(currentScore).some(value => value === buttonDataAnswer)) {
                            $(button).attr('disabled', true);
                        }
                    } else {
                        if (currentScore[boxIndex] === null && $(button).hasClass('active')) {
                            $(button).removeClass('active');
                        }
                        if (currentScore[boxIndex] === null
                            && !Object.values(currentScore).some(score => score === buttonDataAnswer)) {
                            $(button).attr('disabled', false);
                        }
                    }
                });
            })
        }
    }

    replyRow.on('click', '.answer-button:not(:disabled)', function () {
        const dataAnswer = Number($(this).attr('data-answer'));
        const replyNumber = $(this).parents('.reply-box').attr('data-reply');
        const isActive = $(this).hasClass('active');
        currentScore[replyNumber] = isActive ? null : dataAnswer;

        setAnswersValues(currentScore, maxScore, isActive);
    });
    nextStage.on('click', function () {
        const {questions} = data.find(item => item['stage'] === stage);
        if ($('.answer-button.active').length === questions[0].length) {
            const currentStageAnswers = totalScore.find(score => score.stage === stage)['answers'];
            if (!Object.values(currentScore).some(score => score === null)) {
                currentStageAnswers.push({...currentScore});
            }
            openNextStagePopup(stage);
        }
    });
    popupFinalStageButton.on('click', function () {
        step.hide();
        stepsRow.hide();
        resultsRow.show();
        finalResult = calcResult(totalScore, colors);
        $("html, body").stop().animate({scrollTop: 0}, 500, 'swing');

        createResults(finalResult);

        closeNextStagePopup();
    });
    popupBackButton.on('click', function (e) {
        e.preventDefault();
        question = 0;
        updateSlideLine(stage, data);
        update(stage, data);
        nextStage.hide();
        nextQuestion.show();
        const currentStageAnswers = totalScore.find(score => score.stage === stage)['answers'];
        setAnswersValues(currentStageAnswers[question], maxScore, false);
        closeNextStagePopup();
    });
    popupNextStage.on('click', function () {
        step.removeClass(`step-${stage}`);
        stage++;
        step.addClass(`step-${stage}`);
        question = 0;
        maxScore = data.find(item => item['stage'] === stage)['maxScore'];
        nextStage.hide();
        nextQuestion.show();
        prevQuestion.hide();
        nextStageNumber.text(stage);
        updateSlideLine(stage, data);
        update(stage, data);
        setInitialAnswers(stage, data);
        closeNextStagePopup();
    });
    nextQuestion.on('click', function () {
        const {questions} = data.find(item => item['stage'] === stage);
        if ($('.answer-button.active').length === questions[0].length) {
            question++;
            prevQuestion.show();
            const currentStage = totalScore.filter(score => score.stage === stage);
            const currentStageAnswers = currentStage[0]['answers'];
            if (!Object.values(currentScore).some(score => score === null)) {
                if (!currentStageAnswers[question - 1]) {
                    currentStageAnswers.push({...currentScore});
                } else {
                    currentStageAnswers[question - 1] = {...currentScore};
                }
            }
            updateSlideLine(stage, data);
            if (question + 1 < questions.length) {
                update(stage, data);
            } else {
                nextStage.show();
                nextQuestion.hide();
                update(stage, data);
            }
            setInitialAnswers(stage, data);
            if (currentStageAnswers[question] && !Object.values(currentStageAnswers[question]).some(answer => answer === null)) {
                setAnswersValues(currentStageAnswers[question], maxScore, false);
            }
        }
    });
    prevQuestion.on('click', function () {
        if (question - 1 >= 0) {
            question--;
            if (question === 0) {
                prevQuestion.hide();
            }
            updateSlideLine(stage, data);
            nextStage.hide();
            nextQuestion.show();
            update(stage, data);
            const currentStageAnswers = totalScore.filter(score => score.stage === stage)[0]['answers'];
            currentScore = {...currentStageAnswers[question]};
            setAnswersValues(currentStageAnswers[question], maxScore, false);
        }
    });
    popupCloseButton.on('click', function () {
        testPopupWrapper.stop().fadeOut();
    });
    resultForm.on('submit', function (e) {
        e.preventDefault();
        const phone = $('#phone');
        const name = $('#name');

        if (phone.val()) {
            $.ajax({
                url: './contact.php',
                method: 'POST',
                data: $(this).serialize(),
                success: function () {
                    phone.val('');
                    name.val('');
                }
            });
        }
    });

    function update(stage, data) {
        setActiveStage(stage);
        setIsDone(stage);
        setReplyBoxes(stage, data);
        setDescription(stage, data);
        setTextCol(stage, data);
        setQuestionTitle(stage, data);
    }

    function createResults(result) {
        let max = 0;
        let maxColor;
        for (let color in result) {
            if (max < result[color]) {
                max = result[color]
                maxColor = color;
            }
        }
        const sum = Object.values(result).reduce((a, b) => a + b, 0);
        const percents = {};
        const inputResult = Object.entries(result).map(res => {
            percents[res[0]] = (res[1] / sum * 100).toFixed(2);
            return res.join(': ');
        }).join(', ');
        const percentResult = Object.entries(percents).map(percent => percent.join(': ') + '%').join(', ');
        $('#result').val(inputResult);
        $('#percents').val(percentResult);

        $('.js-result-' + maxColor).addClass('active').show();
    }

    function openNextStagePopup(stage) {
        testPopupWrapper.css('display', 'flex').hide().stop().fadeIn();
        testPopupWrapper.find('.test-popup').removeClass('active');
        testPopupWrapper.find(`.stage-${stage}`).addClass('active');
    }

    function closeNextStagePopup() {
        testPopupWrapper.stop().fadeOut();
    }

    function setInitialAnswers(stage, data) {
        const {questions} = data.find(item => item['stage'] === stage);
        questions[0].forEach((_, index) => {
            currentScore[index] = null;
        })
    }

    function updateSlideLine(stage, data) {
        const {questions} = data.find(item => item['stage'] === stage);
        maxQuestions.text(questions.length);
        currentQuestion.text(question + 1);
        $('.scale').empty().append(new Array(questions.length).fill(createLineHtml()).join(''));
        const line = $('.scale .line').eq(question);
        line.addClass('active');
        line.prevUntil('').addClass('active');
    }

    function setDescription(stage, data) {
        const {description} = data.find(item => item['stage'] === stage);
        textRow.empty();
        description.forEach(desc => {
            textRow.append(createDescriptionHtml(desc));
        });
    }

    function setTextCol(stage, data) {
        const {'text-col': textCol} = data.find(item => item['stage'] === stage);
        if (textCol) {
            textRow.find('.flex').remove();
            const flex = document.createElement('div');
            flex.className = 'flex';
            textCol.forEach(col => {
                flex.append(createTextColHtml(col));
            });
            textRow.append(flex);
        }
    }

    function setQuestionTitle(stage, data) {
        const {titles} = data.find(item => item['stage'] === stage);
        if (titles) {
            replyRow.find('.title').remove();
            replyRow.prepend(createQuestionTitleHtml(titles[question]));
        }
    }

    function createDescriptionHtml(description) {
        const p = document.createElement("p");
        p.className = 'text';
        p.innerHTML = description;
        return p;
    }

    function createTextColHtml(textCol) {
        const div = document.createElement("div");
        div.className = 'text-col';
        textCol.forEach(col => {
            div.append(createDescriptionHtml(col));
        });
        return div;
    }

    function createQuestionTitleHtml(title) {
        const span = document.createElement("span");
        span.className = 'title';
        span.innerHTML = title;
        return span;
    }

    function createLineHtml() {
        return `<div class="line"></div>`;
    }

    function createReplyBoxHtml(answersButtons, question, index) {
        return `<div class="reply-box" data-reply="${index}">
            <div class="numbers-row">${answersButtons}</div>
            <span class="text">${question}</span>
        </div>`;
    }

    function createAnswerHtml(answer) {
        return `<button type="button" class="number answer-button" data-answer="${answer}">${answer}</button>`;
    }

    function setReplyBoxes(stage, data) {
        const answersButtons = createAnswersButtonsHtml(stage, data);
        const {questions} = data.find(item => item['stage'] === stage);
        const innerReplyRows = $('.inner-reply-rows');
        const currentQuestions = questions[question];
        innerReplyRows.empty();
        if (currentQuestions.length === 2) {
            replyRow.addClass('two-boxes');
        } else {
            replyRow.removeClass('two-boxes');
        }
        currentQuestions.forEach((item, index) => {
            innerReplyRows.append(createReplyBoxHtml(answersButtons, item, index));
        });

    }

    function createAnswersButtonsHtml(stage, data) {
        const {answers} = data.find(item => item['stage'] === stage);
        return answers.map(answer => createAnswerHtml(answer)).join('');
    }

    function setIsDone(stage) {
        const prevStepBox = $(`.step-box[data-stage=${stage - 1}]`);
        if (prevStepBox) {
            prevStepBox.removeClass('active').addClass('is-done');
        }
    }

    function setActiveStage(stage) {
        $(`.step-box[data-stage=${stage}]`).addClass('active');
    }

    function calcResult(result, colors) {
        const percentResult = {
            red: 0,
            green: 0,
            blue: 0,
            yellow: 0
        };
        result.forEach((res, i) => {
            res['answers'].forEach((answer, j) => {
                Object.values(answer).forEach((val, k) => {
                    const color = colors[i]['answers'][j][k];
                    percentResult[color] += val;
                });
            });
        });
        return percentResult;
    }

    function getData() {
        return $.getJSON('./js/data.json', data => data);
    }

    function getColor() {
        return $.getJSON('./js/colors.json', data => data);
    }

    $(document).on('mouseup', function (e) {
        if (!testPopup.is(e.target) && testPopup.has(e.target).length === 0) {
            closeNextStagePopup();
        }
    });


//    toggle-btn
    const input = $('.js-toggleswitch');
    const textBlock = $('.test-block .result-row .info-col .info-row .text-wrapper');
    const sliderBlock = $('.test-block .result-row .info-col .info-row .slider-wrapper');

    input.on('change', function () {
        if ($(this).prop('checked')) {
            sliderBlock.fadeIn();
            textBlock.hide();
        } else {
            sliderBlock.hide();
            textBlock.fadeIn();
        }
        $('.active .persons-slider').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: '<button class="slider-btn prev top">\n' +
                '<img src="./img/slider-btn-left.svg" alt="">' +
                '                </button>',
            nextArrow: '<button class="slider-btn next top">\n' +
                '<img src="./img/slider-btn-right.svg" alt="">' +
                '                </button>',
            appendArrows: $('.active .slider-wrapper'),
            variableWidth: false,
            centerMode: false,
            infinite: false,
            rtl: true,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        variableWidth: false,
                    }
                }
            ]
        });
    });
});

