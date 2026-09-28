/* =========================================================
   CUTLY — V1 SCRIPT
   Home + Theme + Chat + Create Upload
   ========================================================= */


/* =========================================================
   COMMON HELPERS
   ========================================================= */
const editInstruction = document.querySelector("#edit-instruction");
function $(selector) {
    return document.querySelector(selector);
}

function $$(selector) {
    return document.querySelectorAll(selector);
}


/* =========================================================
   HOME — AI INPUT
   ========================================================= */

const homeAiInput = document.getElementById("ai-input");
const homeSendButton = document.querySelector(".send-button");
const homeVoiceButton = document.querySelector(".voice-button");

function sendHomeMessage() {
    if (!homeAiInput) return;

    const message = homeAiInput.value.trim();

    if (!message) {
        homeAiInput.focus();
        return;
    }

    console.log("CUTLY Home Request:", message);

    homeAiInput.value = "";
    homeAiInput.placeholder = "CUTLY received your request...";

    setTimeout(() => {
        homeAiInput.placeholder = "Ask CUTLY anything...";
    }, 1200);
}

if (homeSendButton) {
    homeSendButton.addEventListener("click", sendHomeMessage);
}

if (homeAiInput) {
    homeAiInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendHomeMessage();
        }
    });
}


/* =========================================================
   HOME — VOICE
   ========================================================= */

let homeIsListening = false;

if (homeVoiceButton) {
    homeVoiceButton.addEventListener("click", () => {
        homeIsListening = !homeIsListening;

        if (homeIsListening) {
            homeVoiceButton.textContent = "Listening...";
            console.log("CUTLY Voice: Listening");
        } else {
            homeVoiceButton.textContent = "Mic";
            console.log("CUTLY Voice: Stopped");
        }
    });
}


/* =========================================================
   THEME SYSTEM
   ========================================================= */

const themeControl = $(".theme-control");
const themeButton = $(".theme-button");
const themeMenu = $(".theme-menu");
const themeCurrent = $(".theme-current");
const themeOptions = $$("[data-theme]");

function applyTheme(theme) {
    if (theme === "system") {
        document.documentElement.removeAttribute("data-theme");
    } else {
        document.documentElement.setAttribute("data-theme", theme);
    }

    localStorage.setItem("cutly-theme", theme);

    if (themeCurrent) {
        const labels = {
            light: "Light",
            dark: "Dark",
            system: "System"
        };

        themeCurrent.textContent = labels[theme] || "System";
    }
}

const savedTheme = localStorage.getItem("cutly-theme") || "system";

applyTheme(savedTheme);

if (themeButton && themeMenu) {
    themeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        themeMenu.hidden = !themeMenu.hidden;
    });
}

themeOptions.forEach((option) => {
    option.addEventListener("click", () => {
        const selectedTheme = option.dataset.theme;

        applyTheme(selectedTheme);

        if (themeMenu) {
            themeMenu.hidden = true;
        }
    });
});

document.addEventListener("click", (event) => {
    if (
        themeControl &&
        themeMenu &&
        !themeControl.contains(event.target)
    ) {
        themeMenu.hidden = true;
    }
});


/* =========================================================
   CHAT SYSTEM
   ========================================================= */

const chatInput = document.getElementById("chat-input");
const chatSendButton = $(".chat-send-button");
const chatVoiceButton = $(".chat-voice-button");
const chatMessages = document.getElementById("chat-messages");

function addChatMessage(message, type) {
    if (!chatMessages) return;

    const messageElement = document.createElement("div");

    messageElement.className = `message ${type}-message`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = type === "ai" ? "C" : "You";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = message;

    messageElement.appendChild(avatar);
    messageElement.appendChild(content);

    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function getDemoResponse(message) {
    const text = message.toLowerCase();

    if (text.includes("j-cut")) {
        return "A J-cut is an audio-first transition where the next scene's audio starts before the visual cut. It helps create smoother transitions and better storytelling.";
    }

    if (
        text.includes("reel") ||
        text.includes("instagram")
    ) {
        return "For a strong reel, start with the most visually interesting moment, keep the first few seconds tight, remove unnecessary pauses, and build a clear visual rhythm.";
    }

    if (text.includes("script")) {
        return "Sure. Tell me the subject, duration, tone and target audience. I can structure the idea into a short-form script.";
    }

    if (
        text.includes("edit") ||
        text.includes("editing")
    ) {
        return "Upload your footage through Create. Then describe the edit naturally — for example: \"First shot semma hook ah irukanum, apram fast cuts venum.\" CUTLY can use that instruction to build an edit plan.";
    }

    return "I understand. Tell me more about what you want to create, and I’ll help you break it down into practical creative steps.";
}

function sendChatMessage() {
    if (!chatInput || !chatMessages) return;

    const message = chatInput.value.trim();

    if (!message) return;

    addChatMessage(message, "user");

    chatInput.value = "";

    const thinking = document.createElement("div");

    thinking.className = "message ai-message";
    thinking.id = "cutly-thinking";

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.textContent = "C";

    const content = document.createElement("div");
    content.className = "message-content";
    content.textContent = "CUTLY is thinking...";

    thinking.appendChild(avatar);
    thinking.appendChild(content);

    chatMessages.appendChild(thinking);

    chatMessages.scrollTop = chatMessages.scrollHeight;

    setTimeout(() => {
        const thinkingElement =
            document.getElementById("cutly-thinking");

        if (thinkingElement) {
            thinkingElement.remove();
        }

        addChatMessage(
            getDemoResponse(message),
            "ai"
        );
    }, 900);
}

if (chatSendButton) {
    chatSendButton.addEventListener(
        "click",
        sendChatMessage
    );
}

if (chatInput) {
    chatInput.addEventListener("keydown", (event) => {
        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {
            event.preventDefault();
            sendChatMessage();
        }
    });
}


/* =========================================================
   CHAT — VOICE
   ========================================================= */

let chatIsListening = false;

if (chatVoiceButton) {
    chatVoiceButton.addEventListener("click", () => {
        chatIsListening = !chatIsListening;

        if (chatIsListening) {
            chatVoiceButton.textContent = "Listening...";
            console.log("CUTLY Chat Voice: Listening");
        } else {
            chatVoiceButton.textContent = "Mic";
            console.log("CUTLY Chat Voice: Stopped");
        }
    });
}


/* =========================================================
   CREATE — VIDEO UPLOAD SYSTEM
   ========================================================= */

const videoUpload =
    document.getElementById("video-upload");

const clipGrid =
    document.getElementById("clip-grid");

const clipCounter =
    document.querySelector(".clip-counter");

let uploadedClips = [];


/* =========================================================
   CREATE — DURATION
   ========================================================= */

function formatDuration(seconds) {
    if (!Number.isFinite(seconds)) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds =
        Math.floor(seconds % 60);

    return (
        String(minutes).padStart(2, "0") +
        ":" +
        String(remainingSeconds).padStart(2, "0")
    );
}


/* =========================================================
   CREATE — UPDATE COUNTER
   ========================================================= */

function updateClipCounter() {
    if (!clipCounter) return;

    clipCounter.textContent =
        `${uploadedClips.length} / 4 clips`;
}


/* =========================================================
   CREATE — RENDER CLIPS
   ========================================================= */

function renderUploadedClips() {
    if (!clipGrid) return;

    clipGrid.innerHTML = "";

    uploadedClips.forEach((clip, index) => {
        const card =
            document.createElement("article");

        card.className = "clip-card";

        const preview =
            document.createElement("video");

        preview.className = "clip-preview";
        preview.src = clip.url;
        preview.controls = true;
        preview.preload = "metadata";

        const details =
            document.createElement("div");

        details.className = "clip-details";

        const name =
            document.createElement("div");

        name.className = "clip-name";
        name.textContent = clip.file.name;

        const duration =
            document.createElement("div");

        duration.className = "clip-duration";
        duration.textContent =
            clip.duration || "Loading...";

        const removeButton =
            document.createElement("button");

        removeButton.type = "button";
        removeButton.className = "clip-remove";
        removeButton.textContent = "Remove";

        removeButton.addEventListener(
            "click",
            () => {
                URL.revokeObjectURL(
                    uploadedClips[index].url
                );

                uploadedClips.splice(index, 1);

                renderUploadedClips();
                updateClipCounter();

                console.log(
                    "CUTLY: Clip removed"
                );
            }
        );

        details.appendChild(name);
        details.appendChild(duration);
        details.appendChild(removeButton);

        card.appendChild(preview);
        card.appendChild(details);

        clipGrid.appendChild(card);

        const tempVideo =
            document.createElement("video");

        tempVideo.preload = "metadata";

      tempVideo.onloadedmetadata = () => {

    clip.durationSeconds = tempVideo.duration;

    clip.duration =
        formatDuration(
            tempVideo.duration
        );

    duration.textContent =
        clip.duration;
};

        tempVideo.src = clip.url;
    });

    updateClipCounter();
}


/* =========================================================
   CREATE — HANDLE VIDEO SELECTION
   ========================================================= */

function handleVideoUpload(event) {
    if (!event.target.files) return;

    const selectedFiles =
        Array.from(event.target.files);

    if (!selectedFiles.length) return;

    const availableSlots =
        4 - uploadedClips.length;

    if (availableSlots <= 0) {
        console.log(
            "CUTLY: Maximum 4 clips allowed."
        );

        event.target.value = "";
        return;
    }

    const filesToAdd =
        selectedFiles.slice(
            0,
            availableSlots
        );

    filesToAdd.forEach((file) => {
        if (
            !file.type.startsWith("video/")
        ) {
            console.log(
                "CUTLY: Only video files are allowed."
            );

            return;
        }

        const alreadyAdded =
            uploadedClips.some((clip) => {
                return (
                    clip.file.name === file.name &&
                    clip.file.size === file.size
                );
            });

        if (alreadyAdded) {
            console.log(
                "CUTLY: Duplicate clip ignored."
            );

            return;
        }

        const url =
            URL.createObjectURL(file);

        uploadedClips.push({
            file: file,
            url: url,
            duration: "Loading..."
        });
    });

    renderUploadedClips();
    updateClipCounter();

    console.log(
        `CUTLY: ${uploadedClips.length} clip(s) uploaded.`
    );

    event.target.value = "";
}

if (videoUpload) {
    videoUpload.addEventListener(
        "change",
        handleVideoUpload
    );
}


// =========================================================
// CREATE — ANALYZE FOOTAGE
// =========================================================

const analyzeButton = document.querySelector(".analyze-button");
const createSections = document.querySelectorAll(
    "main > section:not(.analysis-screen)"
);
const analysisScreen = document.querySelector("#analysis-screen");

const progressFill = document.querySelector("#progress-fill");
const progressPercent = document.querySelector("#progress-percent");

const stepShots = document.querySelector("#step-shots");
const stepMoments = document.querySelector("#step-moments");
const stepPacing = document.querySelector("#step-pacing");
const stepBuilding = document.querySelector("#step-building");

const analysisComplete = document.querySelector("#analysis-complete");
const viewPlanButton = document.querySelector("#view-plan-button");
const editPlanScreen = document.querySelector("#edit-plan-screen");
if (analyzeButton) {

    analyzeButton.addEventListener("click", () => {

        if (!uploadedClips.length) {
            console.log("CUTLY: Upload at least one video.");
            return;
        }

        console.log("CUTLY: Starting footage analysis...");

        // Hide create screen
createSections.forEach(section => {
    section.style.display = "none";
});

        // Show analysis screen
        if (analysisScreen) {
            analysisScreen.style.display = "flex";
        }

        // Reset analysis UI
        progressFill.style.width = "0%";
        progressPercent.textContent = "0%";

        analysisComplete.style.display = "none";
        viewPlanButton.style.display = "none";

        [stepShots, stepMoments, stepPacing, stepBuilding]
            .forEach(step => {
                step.classList.remove("active", "complete");

                const icon = step.querySelector(".step-icon");
                if (icon) icon.textContent = "○";
            });

        // Step 1
        setTimeout(() => {
            stepShots.classList.add("active");
            progressFill.style.width = "25%";
            progressPercent.textContent = "25%";
        }, 300);

        // Step 2
        setTimeout(() => {
            stepShots.classList.remove("active");
            stepShots.classList.add("complete");
            stepShots.querySelector(".step-icon").textContent = "✓";

            stepMoments.classList.add("active");

            progressFill.style.width = "50%";
            progressPercent.textContent = "50%";
        }, 1100);

        // Step 3
        setTimeout(() => {
            stepMoments.classList.remove("active");
            stepMoments.classList.add("complete");
            stepMoments.querySelector(".step-icon").textContent = "✓";

            stepPacing.classList.add("active");

            progressFill.style.width = "75%";
            progressPercent.textContent = "75%";
        }, 1900);

        // Step 4
        setTimeout(() => {
            stepPacing.classList.remove("active");
            stepPacing.classList.add("complete");
            stepPacing.querySelector(".step-icon").textContent = "✓";

            stepBuilding.classList.add("active");

            progressFill.style.width = "90%";
            progressPercent.textContent = "90%";
        }, 2700);

        // Complete
        setTimeout(() => {
            stepBuilding.classList.remove("active");
            stepBuilding.classList.add("complete");
            stepBuilding.querySelector(".step-icon").textContent = "✓";

            progressFill.style.width = "100%";
            progressPercent.textContent = "100%";

            analysisComplete.style.display = "flex";
            viewPlanButton.style.display = "flex";

            console.log("CUTLY: Analysis complete.");

        }, 3500);

    });

}
// =========================================================
// VIEW EDIT PLAN
// =========================================================
const editMeta = document.querySelector(".edit-meta");
const shotList = document.querySelector(".shot-list");
function getTotalFootageDuration() {
    return uploadedClips.reduce((total, clip) => {
        return total + (clip.durationSeconds || 0);
    }, 0);
}
function formatPlanTime(seconds) {
    const safeSeconds = Math.max(0, Math.round(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const secs = safeSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}
function buildEditPlan(instruction) {

    const text = instruction.toLowerCase();

    let style = "Cinematic";
    let pacing = "Balanced";
    let shots = [];
const totalDuration = getTotalFootageDuration();
const hookEnd = totalDuration * 0.25;
const actionEnd = totalDuration * 0.55;
const reactionEnd = totalDuration * 0.80;
    if (
        text.includes("fast") ||
        text.includes("quick") ||
        text.includes("speed")
    ) {
        pacing = "Fast paced";
    }

    if (
        text.includes("slow") ||
        text.includes("emotional") ||
        text.includes("emotion")
    ) {
        pacing = "Slow paced";
    }

    if (
        text.includes("hook") ||
        text.includes("first shot") ||
        text.includes("opening")
    ) {
        shots.push({
            type: "HOOK",
            description: "Start with the strongest opening moment.",
            time: `00:00 – ${formatPlanTime(hookEnd)}`
        });
    }

    shots.push({
        type: "ACTION",
        description: "Move into the main visual action.",
        time: `${formatPlanTime(hookEnd)} – ${formatPlanTime(actionEnd)}`
    });

    if (
        text.includes("reaction") ||
        text.includes("emotion") ||
        text.includes("emotional")
    ) {
        shots.push({
            type: "REACTION",
            description: "Use the strongest reaction to add emotion.",
            time: `${formatPlanTime(actionEnd)} – ${formatPlanTime(reactionEnd)}`
        });
    }

    shots.push({
        type: "ENDING",
        description: "Finish on a clean memorable frame.",
        time: `${formatPlanTime(reactionEnd)} – ${formatPlanTime(totalDuration)}`
    });

    return {
        style,
        pacing,
        shots
    };
}
function renderEditPlan(plan) {

    editMeta.innerHTML = `
        <span>12 sec</span>
        <span>${plan.style}</span>
        <span>${plan.pacing}</span>
    `;

    shotList.innerHTML = plan.shots.map((shot, index) => `
        <div class="shot-card">
            <span class="shot-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <div>
                <strong>${shot.type}</strong>
                <p>${shot.description}</p>
            </div>

            <span class="shot-time">
                ${shot.time}
            </span>
        </div>
    `).join("");
}
if (viewPlanButton && editPlanScreen) {
    viewPlanButton.addEventListener("click", () => {
const instruction = editInstruction
    ? editInstruction.value.trim()
    : "";
const plan = buildEditPlan(instruction);
renderEditPlan(plan);
console.log("CUTLY: User edit instruction:", instruction);
        analysisScreen.style.display = "none";
        editPlanScreen.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        console.log("CUTLY: Edit Plan opened.");
    });
}

/* =========================================================
   INITIALIZED
   ========================================================= */

console.log(
    "CUTLY V1 initialized successfully."
);