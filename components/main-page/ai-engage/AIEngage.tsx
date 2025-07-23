/**
 * @description This component renders the AI 
 * engagement section, which prompts users to
 * interact with AI features.
 */

import { useResponsiveContext } from '@/contexts/ResponsiveContext'

// Context
import { useAppContext } from '@/contexts/AppContext'

// Components
import ChatBox from '@components/main-page/ai-engage/ChatBox'

// Styles
import styles from '@/styles/ai-engage/AIEngage.module.css'
import fonts from '@/styles/common/Typography.module.css'

export default function AIEngage() {
    const { setAiPrompt } = useAppContext()
    const { isMobile } = useResponsiveContext()

    const handlePromptClick = (prompt: string) => {
        setAiPrompt(prompt)
    }

    return (
        <div className={styles.container}>
            <p 
                className={fonts.sub_heading}
                style={{
                    textAlign: 'center', 
                    marginBottom: isMobile? '5rem' : '15rem',
                }}
            >
                Why not chat with me instead?
            </p>
            <div className={styles.chat_box_container}>
                <ChatBox />
            </div>
            {/* Prompt Boxes */}
            <div className={styles.prompt_box_container}>
                <div 
                    className={styles.prompt_box}
                    onClick={() => handlePromptClick("Generate an ML Resume")}
                >
                    <p className={styles.prompt_text}>
                        📄 Generate an ML Resume
                    </p>
                </div>
                <div 
                    className={styles.prompt_box}
                    onClick={() => handlePromptClick("Summarise Skills")}
                >
                    <p className={styles.prompt_text}>
                        🧠 Summarise Skills
                    </p>
                </div>
                <div 
                    className={styles.prompt_box}
                    onClick={() => handlePromptClick("Project Highlights")}
                >
                    <p className={styles.prompt_text}>
                        🛠️ Project Highlights
                    </p>
                </div>
            </div>
        </div>
    )
}